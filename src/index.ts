import { plainToInstance } from "class-transformer";
import express from "express";
import "reflect-metadata";
import { Env } from "./env";

const app = express();
app.use(express.json());

const start = async () => {
  try {
    const env = plainToInstance(Env, process.env);
    env.validate();

    app.listen(env.PORT, () =>
      console.log(`Server started on port ${env.PORT}`),
    );
  } catch (e) {
    console.error(e);
  }
};

start();
