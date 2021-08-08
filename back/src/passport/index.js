const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("../db");
const { Strategy: LocalStrategy } = require("passport-local");

module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 요청 마다 id에 따른 user 찾아서 request 객체에 넣어줌
  passport.deserializeUser(async (userId, done) => {
    try {
      const connect = await db.connect();
      const { rows } = await connect.query(
        `
        SELECT id, email, name, createdAt FROM public.user WHERE id = $1
      `,
        [userId]
      );

      connect.release();

      done(null, rows[0]);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        console.log(username, password);
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

          connect.release();

          const user = rows[0];

          const compared = await bcrypt.compare(password, user.password);

          if (!compared) {
            return done(null, false, {
              message: "비밀번호가 일치하지 않습니다",
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
};
