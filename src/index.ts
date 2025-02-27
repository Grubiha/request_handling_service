import express from "express";
import "reflect-metadata";
import dataSource from "./typeorm/data_source";
import router from "./router";
import { ErrorMiddleware } from "./middleware/error_middleware";

const app = express();
app.use(express.json());
app.use(router);
app.use(ErrorMiddleware);

const start = async () => {
  try {
    const PORT = parseInt(process.env.PORT || "", 10);
    if (isNaN(PORT)) throw new Error("PORT from .env is not a number");
    await dataSource.initialize();
    await dataSource.runMigrations();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
