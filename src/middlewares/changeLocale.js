const setLocale = (req, res, next) => {
  req.i18n.changeLanguage('en');
  next();
};

export default setLocale;
