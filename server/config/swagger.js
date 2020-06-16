
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

module.exports = (app) => {

    // Extended: https://swagger.io/specification/#infoObject
    const swaggerOptions = {
        swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "PHRH API",
            description: "API Routes pour application de plannification",
            contact: {
            name: "Amazing Developer"
            },
            servers: [`http://localhost:${process.env.SERVER_PORT}`]
            }
        },
        apis: ['.routes/*.routes.js']
        //apis: ["app.js"]
    };
  
    const swaggerDocs = swaggerJsDoc(swaggerOptions);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}