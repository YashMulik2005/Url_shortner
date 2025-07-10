const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const urlroute = require("./routes/url");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

mongoose.set("strictQuery", false);
const db =
  "mongodb+srv://yashmulik2005:LyTakvmP0aahESYO@cluster0.yy2tfix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//yashmulik2005
//LyTakvmP0aahESYO
mongoose
  .connect(db)
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/url", urlroute);

app.listen(3000, () => {
  console.log("server is running.");
});
