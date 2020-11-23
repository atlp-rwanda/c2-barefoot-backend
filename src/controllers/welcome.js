// Welcome page controller

const welcome = (req, res) => {
  res.status(200).json({ status: 200, message: req.t('home.message') });
};

export default welcome;
