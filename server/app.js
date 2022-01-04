import express from "express";
import config from "./config/index.js";
import loader from "./loaders/index.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const startServer = async () => {
  const app = express();

  await loader(app);

  app
    .listen(config.port, () => {
      console.log(`
            ########################################
              🛡️  Server listening on port: ${config.port} 🛡️
            ########################################
          `);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit(1);
    });
};
startServer();
