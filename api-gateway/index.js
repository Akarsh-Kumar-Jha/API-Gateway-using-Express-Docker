const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API Gateway Running on port 3000...");
});

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
app.post("/blogs/create-blog", async (req, res) => {
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
