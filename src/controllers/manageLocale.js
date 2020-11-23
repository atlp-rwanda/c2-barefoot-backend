import localeServices from '../services/locales.service';

const getAllLocale = async (req, res) => {
  const records = await localeServices.getAllLocales();
  if (records) return res.status(200).json({ status: '200', records });
};

const getLocale = async (req, res) => {
  const record = await localeServices.getLocalesByLocaleId();
  if (record) return res.status(200).json({ status: '200', record });
};

export { getAllLocale, getLocale };
