const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Trần Quốc Khang - TRẦN THỊ THANH PHƯƠNG - DESIGN PATTERN ASSIGNMENT',
    version: '1.0.0',
    description: 'Design Pattern Assignment: APIs document of a chatting app',
  },
  servers: [
    // {
    //   url: 'https://tranquockhang-be-assm.onrender.com',
    //   description: 'Production server',
    // },
    {
      url: 'http://localhost:8000',
      description: 'Development server',
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