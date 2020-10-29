const logout = (_req, res) => {
  try {
    res.clearCookie('make', { path: '/refresh-token' });

    res.status(200).json({ status: 200, message: 'Logout successful!' });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export default logout;
