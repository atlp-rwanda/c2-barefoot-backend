// Swagger set up
import path from 'path';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad',
      version: '1.0.0',
      description:
                "Barefoot Nomad is an application that will enable its Company Nomads' book their international travel and accommodation globally, easily and conveniently across all the locations/centers where the company has its operation.",
      license: {
        name: 'MIT',
        url: ''
      },
      contact: {
        name: 'Barefoot-nomad',
        url: '',
        email: 'info@barefootnomad.com'
      }
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    // all swagger api files will included here like below example
    //   this is an example of how to include file : path.resolve(__dirname,'./Users.js'),
    path.resolve(__dirname, '../routes/signUpRoute.js')
  ]
};
export default options;
