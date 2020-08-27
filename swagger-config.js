/*
 * @file: swagger-config.js
 * @description: It Contain swagger configrations.
 * @author: Pankaj Pandey
 */
import swaggerJsDocs from 'swagger-jsdoc';
import config from 'config';
const { host, apiHost, port } = config.get('app');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Bookzdoctors project apis',
      version: '1.0',
      description: 'All api end points',
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
