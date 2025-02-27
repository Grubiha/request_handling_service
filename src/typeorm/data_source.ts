import { DataSource } from "typeorm";
import { Answer, Question } from "./entity";
import {
  CreateExtensionUuidOssp1740597148729,
  CreateTablesQuestionAnswer1740588881462,
} from "./migration";

const AppDataSource = () => {
  const port = parseInt(process.env.DB_PORT || "", 10);
  const host = process.env.DB_HOST;
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME;

  if (isNaN(port)) throw new Error("DB_PORT from .env is not a number");
  if (!host) throw new Error("DB_HOST from .env is empty");
  if (!username) throw new Error("DB_USERNAME from .env is empty");
  if (!password) throw new Error("DB_PASSWORD from .env is empty");
  if (!database) throw new Error("DB_NAME from .env is empty");

  return new DataSource({
    type: "postgres",
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    logging: true,
    entities: [Answer, Question],
    migrations: [
      CreateExtensionUuidOssp1740597148729,
      CreateTablesQuestionAnswer1740588881462,
    ],
  });
};

export default AppDataSource();
