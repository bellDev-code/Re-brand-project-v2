const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

const bcryptHashedJoin = async (client, req) => {
  const salt = await bcrypt.genSalt(+process.env.PASSWORD_ROUND_LENGTH);
  const hashed = await bcrypt.hash(req.body.password, salt);

  const now = dayjs().format();

  await client.query(
    `
      INSERT INTO public."User" (username, password, name, "createdAt", email, "phoneNumber" )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      req.body.username,
      hashed,
      req.body.name,
      now,
      req.body.email,
      req.body.phoneNumber,
    ]
  );
};

const changeHashed = async (client, { changePassword, type, payload }) => {
  const salt = await bcrypt.genSalt(+process.env.PASSWORD_ROUND_LENGTH);
  const hashed = await bcrypt.hash(changePassword, salt);

  switch (type) {
    case "email":
      await await client.query(
        `
          UPDATE public."User" SET password=$1 WHERE email=$2
        `,
        [hashed, payload]
      );
      break;
    case "phone":
      await client.query(
        `
            UPDATE public."User" SET password=$1 WHERE "phoneNumber"=$2
          `,
        [hashed, payload]
      );
      break;
    default:
      throw new Error("올바르지 않은 verification type입니다.");
  }
};

exports.bcryptHashedJoin = bcryptHashedJoin;
exports.changeHashed = changeHashed;
