const isExistUser = async (client, req) => {
  await client.query(
    `
      SELECT * FROM public."User" WHERE username = $1 OR email = $2
    `,
    [req.body.username, req.body.email]
  );
};

const getUser = async (client, { id }) => {
  await client.query(
    `
      SELECT id, name, email, "createdAt", "phoneNumber" FROM public."User" WHERE id = $1
    `,
    [parseInt(id)]
  );
};

const LoginUser = async (client, user) => {
  await client.query(
    `
  SELECT id, email, name, "createdAt", "phoneNumber" FROM public."User" WHERE id = $1 
`,
    [user.id]
  );
};

exports.isExistUser = isExistUser;
exports.getUser = getUser;
exports.LoginUser = LoginUser;
