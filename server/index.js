const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// middlewares used for handling files
const fileUpload = require("express-fileupload");

// setting configuration for our backend
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(bodyParser.json());
app.use(cors());

// cookie-parser middleware used to parse the cookies stored in client's machine
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Middleware use kiya ja rha hai to parse data in db in json format
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}));


require("./config/database").connect();

const user = require("./routes/user");
app.use("/api/v1", user);

app.get("/", (req,res) => {
    res.json({
        success:true,
        message:"Welcome to our website"
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})