const isLogedIn = (req, res, next) => {
  const bearerToken = req.headers.authorization.split(' ')[1];
  if (!bearerToken) return res.status(401).json({ status: 401, message: 'You are not loged in' });
  return next();
};

export default isLogedIn;
