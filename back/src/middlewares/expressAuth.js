// express session authorization middleware

const authMiddleware = async (req, res, next) => {
  console.log(req.session);

  if (req.session.userId) {
    const client = await db.connect();
    const { rows } = await client.query(
      `
        SELECT id, email, name, "createdAt", "phoneNumber" FROM public.user WHERE id = $1 
      `,
      [req.session.userId]
    );
    const user = rows[0];
    req.user = user;
  }

  next();
};

module.exports = authMiddleware;
