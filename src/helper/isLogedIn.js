const isLogedIn = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return res.status(401).json({ status: 401, message: res.__('You are not loged in') });
  return next();
};

export default isLogedIn;
