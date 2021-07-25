const express = require("express");
const db = require("./db");

// db connecting test
// const test = async () => {
//   db.connect();
//   db.query("SELECT NOW()", (err, res) => {
//     console.log(err, res);
//     db.end();
//   });
// };

// test();
const app = express();
app.use(express.json());

// set port
app.set("PORT", process.env.PORT || 4190);

// index 가져옴
const api = require("./routers");

app.use("/api", api);

// router 써서 필요 없어짐
// app.get("*", (req, res, next) => {
//   console.log("hello world!");

//   res.send("ok");
// });

app.listen(app.get("PORT"), () => {
  console.log(`listen on localhost:${app.get("PORT")}`);
});
