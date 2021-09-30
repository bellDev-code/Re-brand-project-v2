const dayjs = require("dayjs");
const { sendEmail } = require("../utils/email");
const { sendPhoneSMS } = require("../utils/phone");

// 목적이 다르기 때문에 client, {type, payload}로 구별한다.

/**
 * @description findUserByVerification 함수는 type이 email인지 phone인지 확인한다.
 */
const findUserByVerification = async (client, { type, payload }) => {
  // 초기화 기존 let = rows; 올바르지 않은 타입이 들어와서 rows.length에서 오류가 난다.
  let rows = [];

  switch (type) {
    case "email":
      const emailQuery = await client.query(
        `
          SELECT username, email FROM public."User" WHERE email = $1
        `,
        [payload]
      );

      rows = emailQuery.rows;

      break;
    case "phone":
      const phoneQuery = await client.query(
        `
        SELECT username, "phoneNumber" FROM public."User" WHERE "phoneNumber" = $1
      `,
        [payload]
      );

      rows = phoneQuery.rows;
      break;
    default:
      throw new Error("올바른 verification type이 아닙니다.");
  }

  if (!rows.length) {
    throw new Error("해당 데이터를 가진 유저가 없습니다.");
  }

  return rows[0];
};

/**
 * @description create 함수 => create 로직 후 생성된 데이터까지 return
 */
const createVerification = async (client, { type, payload }) => {
  await client.query(
    `
      DELETE FROM public."Verification" WHERE payload = $1 AND "verifyType" = $2
    `,
    [payload, type.toUpperCase()]
  );

  const expiredAt = dayjs()
    .minute(dayjs().minute() + 5)
    .format();

  const code = (Math.random() * 1000000).toFixed(0);

  await client.query(
    `
      INSERT INTO public."Verification" ("verifyType", payload, code, "isVerified", "expiredAt") VALUES($1, $2, $3, $4, $5)
    `,
    [type.toUpperCase(), payload, code, false, expiredAt]
  );

  return {
    type: type.toUpperCase(),
    payload: payload,
    code: code,
    isVerified: false,
    expiredAt: expiredAt,
  };
};

/**
 *
 * @description findVerification 함수는 올바른 인증코드인지 확인한다.
 */
const findVerification = async (client, { type, payload, code }) => {
  const { rows } = await client.query(
    `
      SELECT * FROM public."Verification" WHERE "verifyType" = $1 AND payload = $2 AND code = $3 AND "isVerified" = false
    `,
    [type.toUpperCase(), payload, code]
  );
  if (!rows.length) {
    throw new Error("올바르지 않은 인증코드입니다.");
  }

  return rows[0];
};

/**
 * @description 인증은 1회만 가능하도록 isVerified = true 인증
 */
const expireVerification = async (client, verification) => {
  console.log(verification);
  await client.query(
    `
      UPDATE public."Verification" SET "isVerified" = $2 WHERE id = $1
    `,
    [verification.id, true]
  );
  return {
    ...verification,
    isVerified: true,
  };
};

/**
 * @description sendVerification 함수는 type에 따라 email 인증 메세지, phone 인증 메세지
 */
const sendVerification = async (type, user, code) => {
  switch (type) {
    case "email":
      await sendEmail({
        to: user.email,
        subject: "Re-brand 아이디 찾기 메일입니다.",
        text: `인증 코드는 ${code}입니다.`,
      });
      break;
    case "phone":
      await sendPhoneSMS({
        to: user.phoneNumber,
        text: `인증 코드는 ${code}입니다.`,
      });
      break;
    default:
      throw new Error("올바른 verification type이 아닙니다.");
  }
};

/**
 * @description checkVerifyType type 확인 하는 함수
 */
const checkVerifyType = (type) => {
  if (!type && (type !== "email" || type !== "phone")) {
    throw new Error("type이 올바르지 않습니다.");
  }
};

/**
 * @description validVerification 함수는 이미 인증된 데이터거나 인증 만료시간이 지났을 경우 check
 */
const validVerification = (verification) => {
  // isVerified가 client에서는 기본값이 false이기 때문에
  if (verification.isVerified) {
    throw new Error("인증 오류");
  }

  if (dayjs(verification.expiredAt).format() < dayjs().format()) {
    throw new Error("인증 유효시간이 지났습니다.");
  }
};

exports.findUserByVerification = findUserByVerification;
exports.createVerification = createVerification;
exports.findVerification = findVerification;
exports.expireVerification = expireVerification;
exports.sendVerification = sendVerification;
exports.checkVerifyType = checkVerifyType;
exports.validVerification = validVerification;
