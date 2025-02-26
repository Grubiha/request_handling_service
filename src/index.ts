import express from "express";
import "reflect-metadata";

const app = express();
app.use(express.json());

const start = async () => {
  try {
    const PORT = parseInt(process.env.PORT || "", 10);
    if (isNaN(PORT)) throw new Error("PORT from .env is not a number");

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error(e);
  }
};

start();
