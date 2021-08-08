const express = require("express");
const db = require("./db");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const LocalStore = require("session-file-store")(session);
// const authMiddleware = require("./middlewares/auth");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const app = express();

// Request body
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

// Cross-Origin Resource Sharing
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3090",
  })
);

//response header의 보안을 지켜준다.
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

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    done(null, false);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameFiled: "username",
      passwordFiled: "password",
    },
    async (username, password, done) => {
      try {
        const connect = await db.connect();

        const { rows } = await connect.query(
          `
          SELECT * FROM public.user WHERE username = $1
        `,
          [username]
        );

        if (!rows.length) {
          return done(null, false, {
            message: "존재하지 않는 아이디입니다.",
          });
        }

        const user = rows[0];

        const compared = await bcrypt.compare(password, user.password);

        if (!compared) {
          return done(null, false, {
            message: "비밀번호가 일치하지 않습니다.",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(authMiddleware);

// set port
app.set("PORT", process.env.PORT || 4190);

// index 가져옴
const api = require("./routers");
const { Passport } = require("passport");

app.use("/api", api);

app.listen(app.get("PORT"), () => {
  console.log(`listen on localhost:${app.get("PORT")}`);
});
