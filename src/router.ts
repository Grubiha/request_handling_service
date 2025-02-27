import express from "express";
import { Controller } from "./controller";
import data_source from "./typeorm/data_source";
import { Answer, Question } from "./typeorm/entity";
import { Usecase } from "./usecase";

const questionRepository = data_source.getRepository(Question);
const answerRepository = data_source.getRepository(Answer);

const usecase = new Usecase(questionRepository, answerRepository);
const controller = new Controller(usecase);

const router = express.Router();

router.post("/questions", controller.New);
router.patch("/questions/:id/process", controller.Process);
router.patch("/questions/:id/complate", controller.Complate);
router.patch("/questions/:id/cancel", controller.Cancel);
router.get("/questions", controller.GetQuestions);
router.patch("/questions/cancel-all-in-process", controller.CancelAllInProcess);

export default router;
