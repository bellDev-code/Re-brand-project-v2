const express = require("express");
const db = require("./db");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const LocalStore = require("session-file-store")(session);

const app = express();
//response header의 보안을 지켜준다.

// Request body
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3090",
  })
);

app.use(helmet());

// passport 사용 시 기본으로 적용해야함
app.use(
  session({
    // client cookie에 저장될 key
    // session store 세션 저장 위치
    name: "connect-sid",
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE.ENV === "production" ? true : false,
    },
    store: new LocalStore(),
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

// set port
app.set("PORT", process.env.PORT || 4190);

// index 가져옴
const api = require("./routers");

app.use("/api", api);

app.listen(app.get("PORT"), () => {
  console.log(`listen on localhost:${app.get("PORT")}`);
});
