import express from "express";
import config from "./config/index.js";
import loader from "./loaders/index.js";

const startServer = async () => {
  const app = express();

  await loader(app);

  const server = app
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
  return server;
};

const server = startServer();
export default server;
