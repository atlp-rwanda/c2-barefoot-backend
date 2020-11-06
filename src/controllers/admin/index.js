// Welcome page controller

const welcome = (req, res) => {
  res.status(200).json({ status: 200, message: 'Welcome as an administrator of Barefoot nomad' });
};

export default welcome;
