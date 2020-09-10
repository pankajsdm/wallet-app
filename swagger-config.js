/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Pankaj Pandey
 */
import swaggerJsDocs from 'swagger-jsdoc';
import config from 'config';
const { name, host, apiHost, port } = config.get('app');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: name,
      version: '1.0',
      description: 'Endpoints of wallet app application.',
      contact: {
        name: 'Pankaj Pandey'
      },
      servers: [host + ':' + port]
    },
    produces: ['application/json'],
    host: host + ':' + port
  },
  apis: process.env.NODE_ENV === 'live' ? ['*/*/*/*/*.js'] : ['./api/v1/*/*.js'],
  layout: 'AugmentingLayout'
};
export default swaggerJsDocs(swaggerOptions);
