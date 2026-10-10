'use strict';

const fs = require('node:fs/promises');
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
});

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

const doc = {
  info: {
    title: 'Klix BE API',
    version: '1.0.0',
    description: 'API documentation for Klix BE',
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(async () => {
    // Učitaj automatski generisanu dokumentaciju
    const swaggerDocument = JSON.parse(await fs.readFile(outputFile, 'utf8'));

    let updatedCount = 0;

    // Dodaj generički JSON body svim POST, PUT i PATCH endpointima
    for (const pathItem of Object.values(swaggerDocument.paths)) {
      for (const method of ['post', 'put', 'patch']) {
        if (pathItem[method]) {
          pathItem[method].requestBody = {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  additionalProperties: true,
                },
                example: {},
              },
            },
          };

          updatedCount++;
        }
      }
    }

    // Sačuvaj ažuriranu dokumentaciju
    await fs.writeFile(outputFile, JSON.stringify(swaggerDocument, null, 2));

    console.log(`Added generic JSON body to ${updatedCount} POST, PUT and PATCH endpoints.`);

    // Pokreni Express tek nakon generisanja dokumentacije
    require('./index.js');
  })
  .catch((error) => {
    console.error('Failed to generate Swagger documentation:', error);
    process.exit(1);
  });
