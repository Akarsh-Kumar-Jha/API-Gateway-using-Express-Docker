const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
res.send('User Service Running on port 3000...');
});

app.post('/users/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    return res.json({
        success:true,
        message:"User created successfully bu user-service✅",
        user
    });
});

app.listen(port, () => console.log(`User-service listening on port ${port}`));