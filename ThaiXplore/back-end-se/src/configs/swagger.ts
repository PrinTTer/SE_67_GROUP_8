import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation generated automatically',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; // ไฟล์ JSON ที่จะเก็บเอกสาร
const endpointsFiles = ['../routes/*.ts']; // ไฟล์ที่มี route API ของคุณ

swaggerAutogen()(outputFile, endpointsFiles);