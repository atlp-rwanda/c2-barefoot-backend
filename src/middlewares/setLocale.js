const setUserLocale = async (req, res, next) => {
  const { locale } = req.cookies;
  if (locale) req.i18n.changeLanguage(locale);
  next();
};

export default setUserLocale;
