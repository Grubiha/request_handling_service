import {
  CreateQuestionDto,
  FindQuestionDto,
  FindQuestionsDto,
  RespondDto,
} from "./dto";

export interface IUsecase {
  New(dto: CreateQuestionDto): Promise<string>;
  Process(dto: FindQuestionDto): Promise<void>;
  Complete(dto: RespondDto): Promise<void>;
  Cancel(dto: RespondDto): Promise<void>;
  GetQuestions(dto: FindQuestionsDto): Promise<any>;
  CancelAllInProcess(): Promise<void>;
}
