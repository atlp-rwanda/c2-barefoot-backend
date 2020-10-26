import landingPage from './landingPageRoute';
import signUp from './signUpRoute';
import emailVerification from './emailVerificationRoute';

export default (app) => {
  app.use('/', landingPage);
  app.use('/signup', signUp);
  app.use('/verification', emailVerification);
};
