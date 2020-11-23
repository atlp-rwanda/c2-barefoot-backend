import models from '../models';

const { Locale, User } = models;
/**
 * different methods on Locales method
 */
class LocaleService {
  /**
   * @param {object} locales contains Locales properties
   */
  constructor() {
    this.locale = Locale;
  }

  /**
   * @return {object} return all locales in Db
   */
  async getAllLocales() {
    return this.locale.findAll();
  }

  /**
   * @param {string} locale add locale
   * @return {object} return a single locale in Db
   */
  async getLocalesByLocaleId(locale) {
    return this.locale.findAll({ include: User });
    // return this.locale.findOne({ where: { locale } });
  }

  /**
   * @param {string} locale add locale
   * @return {object} return message
   */
  async deleteLocale(locale) {
    return this.locale.destroy({ where: { locale } });
  }
}

export default new LocaleService();
