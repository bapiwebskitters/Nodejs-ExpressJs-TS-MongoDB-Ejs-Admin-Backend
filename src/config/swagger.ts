// src/config/swagger.ts

import { OpenAPIV3 } from "openapi-types";
import { BASE_URL, PORT } from "./index";

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Nodejs ExpressJs TS MongoDB Backend API",
    version: "1.0.0",
    description: "API documentation for Demo project",
  },
  servers: [
    {
      url: `${BASE_URL}:${PORT}`,
      description: "Development server",
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
  paths: {},
};

export default swaggerDefinition;
