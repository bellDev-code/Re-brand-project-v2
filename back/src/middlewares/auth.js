exports.IsLoggedIn = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
      return;
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Not authorization",
      data: null,
    });
  }
};

exports.IsNotLoggedIn = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      next();
      return;
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({
      success: true,
      error: "Not authorization",
      data: null,
    });
  }
};
