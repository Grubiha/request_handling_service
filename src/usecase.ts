import { Repository } from "typeorm";
import {
  CreateQuestionDto,
  FindQuestionDto,
  FindQuestionsDto,
  RespondDto,
} from "./domain/dto";
import { Answer, Question, QuestionStatus } from "./typeorm/entity";
import { ApiError } from "./error";
import { IUsecase } from "./domain/usecase";

export class Usecase implements IUsecase {
  constructor(
    readonly questionRepository: Repository<Question>,
    readonly answerRepository: Repository<Answer>,
  ) {}

  async New(dto: CreateQuestionDto): Promise<string> {
    dto.validate();
    const question = this.questionRepository.create(dto);
    const savedQuestion = await this.questionRepository.save(question);
    return savedQuestion.id;
  }

  async Process(dto: FindQuestionDto): Promise<void> {
    dto.validate();
    const question = await this.questionRepository.findOneBy({ id: dto.id });
    if (!question) throw ApiError.NotFoundError("Question not found");

    question.status = QuestionStatus.IN_PROGRESS;
    this.questionRepository.save(question);
  }

  async Complete(dto: RespondDto): Promise<void> {
    dto.validate();
    const question = await this.questionRepository.findOneBy({ id: dto.id });
    if (!question) throw ApiError.NotFoundError("Question not found");

    const answer = this.answerRepository.create({ text: dto.text });
    const savedAnswer = await this.answerRepository.save(answer);

    question.answer_id = savedAnswer.id;
    question.status = QuestionStatus.COMPLETED;
    this.questionRepository.save(question);
  }

  async Cancel(dto: RespondDto): Promise<void> {
    dto.validate();
    const question = await this.questionRepository.findOneBy({ id: dto.id });
    if (!question) throw ApiError.NotFoundError("Question not found");

    const answer = this.answerRepository.create({ text: dto.text });
    const savedAnswer = await this.answerRepository.save(answer);

    question.answer_id = savedAnswer.id;
    question.status = QuestionStatus.CANCELED;
    this.questionRepository.save(question);
  }

  async GetQuestions(dto: FindQuestionsDto): Promise<Question[]> {
    dto.validate();
    const query = this.questionRepository.createQueryBuilder("question");
    if (dto.after)
      query.where("question.created_at >= :after", { after: dto.after });
    if (dto.before)
      query.where("question.created_at <= :before", { before: dto.before });
    query.leftJoinAndSelect("question.answer", "answer");
    return query.getMany();
  }

  async CancelAllInProcess(): Promise<void> {
    this.questionRepository.update(
      { status: QuestionStatus.IN_PROGRESS },
      { status: QuestionStatus.CANCELED },
    );
  }
}
