export const verifyResetPassword = async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!decodedToken)
    return res.status(403).json({ status: 403, error: "invalid token" });
  if (password === confirmPassword)
    return res
      .status(400)
      .json({ status: 400, error: "Passwords do not match" });
  // const updatedPassword = await
};
