const express = require("express");
const db = require("./db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const LocalStore = require("session-file-store")(session);

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:3090",
    credentials: true,
  })
);
app.use(helmet());
app.set("trust proxy", 1); // trust first proxy

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    // client cookie에 저장될 key
    // session store 세션 저장 위치
    name: "connect-sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    store: new LocalStore(),
  })
);

// passport 사용
require("./passport")(app);

// Set port
app.set("PORT", process.env.PORT || 4190);

const api = require("./routers");
app.use("/api", api);

app.listen(app.get("PORT"), () => {
  console.log(`listen on localhost:${app.get("PORT")}`);
});
