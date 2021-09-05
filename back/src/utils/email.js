const mailgun = require("mailgun-js");
const DOMAIN = "sandboxbcf7246f009b40baa71a959305c5539b.mailgun.org";
const mg = mailgun({
  apiKey: "066bd0f6ae6a5bfd1ed041225eee6dbc-156db0f1-ea268b14",
  domain: DOMAIN,
});

const sendEmail = async ({ to, subject, text }) => {
  const payload = {
    from: `Re-brand <me@samples.mailgun.org>`,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const data = await mg.messages().send(payload);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.sendEmail = sendEmail;
