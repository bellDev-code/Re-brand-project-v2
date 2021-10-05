const sql = {
  user: {
    findByEmail: (fields) =>
      `SELECT ${String(fields)} FROM public."User" WHERE email = $1`,
    checkByUsername: 'SELECT * FROM public."User" WHERE username = $1',
    checkByEmail: 'SELECT * FROM public."User" WHERE email = $1',
    loginUser:
      'SELECT id, email, name, "createdAt", "phoneNumber" FROM public."User" WHERE id = $1',
    isExists: 'SELECT * FROM public."User" WHERE username = $1 OR email = $2',
    getUser:
      'SELECT id, name, email, "createdAt", "phoneNumber" FROM public."User" WHERE id = $1',
  },
  verify: {
    find: 'SELECT * FROM public."Verification" WHERE payload = $1 AND code = $2',
  },
};

module.exports = sql;
