const express = require("express");
const app = express();
const cors = require("cors");


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const port = process.env.PORT || 3002;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port +", port);
});
