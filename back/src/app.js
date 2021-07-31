const express = require("express");
const db = require("./db");

const app = express();

// Request body
app.use(express.json());

// set port
app.set("PORT", process.env.PORT || 4190);

// index 가져옴
const api = require("./routers");

app.use("/api", api);

app.listen(app.get("PORT"), () => {
  console.log(`listen on localhost:${app.get("PORT")}`);
});
