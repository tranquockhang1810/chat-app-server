const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'TRẦN QUÓC KHANG - TRẦN THỊ THANH PHƯƠNG - DESIGN PATTERN ASSIGNMENT',
    version: '1.0.0',
    description: 'Design Pattern Assignment: APIs document of a chatting app',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development server',
    },
    {
      url: 'https://chat-app-server-sut5.onrender.com',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/**/*.js', './models/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};