const logout = (req, res) => {
  try {
    let tokens = req.headers.authorization;
    tokens = '';
    res.status(200).json({ status: 200, message: 'Logout successful!' });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export default logout;
