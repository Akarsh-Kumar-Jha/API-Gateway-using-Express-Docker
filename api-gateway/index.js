const express = require("express");
const app = express();
const axios = require("axios");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API Gateway Running on port 3000...");
});

app.post('/login',async(req,res) => {
  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({
      success:false,
      message:"Please enter email and password"
    });
  }
  const payload = {
    email:email,
    password:password
  };

  const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
  return res.cookie('token',token).status(200).json({
    success:true,
    message:"User logged in successfully",
    token
  });
});

app.post('/logout',async(req,res) => {
  return res.clearCookie('token').status(200).json({
    success:true,
    message:"User logged out successfully",
  });
});

function authenticate(req,res,next){
const token = req.cookies.token;
console.log('Authenticate Middleware Triggered✅ token=',token);
if(!token){
  return res.status(401).json({
    success:false,
    message:"Please login first"
  });
};
try{
  const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user = payload;
  next();
}catch(error){
 return res.status(401).json({
  success:false,
  message:"Invalid Token",
  error
 });
}
}

app.post(
  "/users/create-user",

  async (req, res) => {
    try {
      const url = "http://user-service:3000/users/create-user";
      const data = req.body;
      const response = await axios.post(url, data);
      console.log("Response In Api Gateway", res.data);
      return res.status(200).json({
        success: true,
        message: "User-Service Returned Successfully",
        user: response.data,
      });
    } catch (error) {
      console.error("err occured In api gateway", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      })
    }
  },
);
///blogs/create-blog
app.post("/blogs/create-blog",authenticate, async (req, res) => {
  try {
    const url = "http://blog-service:8000/blogs/create-blog";
    const data = req.body;
    const response = await axios.post(url, data);
    return res.status(200).json({
      success: true,
      message: "Blog-Service Returned Successfully",
      user: response.data,
    });
  } catch (error) {
    console.error("err occured In api gateway", error);
    return res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Gateway listening on port ${port}`));
