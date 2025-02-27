import { NextFunction, Request, Response } from "express";
import { IUsecase } from "./domain/usecase";
import { plainToInstance } from "class-transformer";
import {
  CreateQuestionDto,
  FindQuestionDto,
  FindQuestionsDto,
  RespondDto,
} from "./domain/dto";

export class Controller {
  constructor(readonly usecase: IUsecase) {
    this.New = this.New.bind(this);
    this.Process = this.Process.bind(this);
    this.Complate = this.Complate.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.GetQuestions = this.GetQuestions.bind(this);
    this.CancelAllInProcess = this.CancelAllInProcess.bind(this);
  }
  async New(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, text } = req.body;
      const dto = plainToInstance(CreateQuestionDto, { title, text });
      const id = await this.usecase.New(dto);
      res.status(201).json({ message: "OK", body: { id } });
    } catch (err) {
      next(err);
    }
  }

  async Process(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const dto = plainToInstance(FindQuestionDto, { id });
      await this.usecase.Process(dto);
      res.status(200).json({ message: "OK" });
    } catch (err) {
      next(err);
    }
  }

  async Complate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const dto = plainToInstance(RespondDto, { id, text });
      await this.usecase.Complete(dto);
      res.status(200).json({ message: "OK" });
    } catch (err) {
      next(err);
    }
  }

  async Cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const dto = plainToInstance(RespondDto, { id, text });
      await this.usecase.Cancel(dto);
      res.status(200).json({ message: "OK" });
    } catch (err) {
      next(err);
    }
  }

  async GetQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const { after, before } = req.query;

      const filter: { after?: string; before?: string } = {}
      if (typeof after === "string") filter.after = after;
      if (typeof before === "string") filter.before = before;
      
      const dto = plainToInstance(FindQuestionsDto, filter);
      const questions = await this.usecase.GetQuestions(dto);
      res.status(200).json({ message: "OK", body: questions });
    } catch (err) {
      next(err);
    }
  }

  async CancelAllInProcess(req: Request, res: Response, next: NextFunction) {
    try {
      await this.usecase.CancelAllInProcess();
      res.status(200).json({ message: "OK" });
    } catch (err) {
      next(err);
    }
  }
}
