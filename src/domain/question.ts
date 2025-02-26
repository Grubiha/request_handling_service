// export type IssueStatus = "Новое" | "В работе" | "Завершено" | "Отменено"

export enum QuestionStatus {
  New = "Новое",
  InProcess = "В работе",
  Completed = "Завершено",
  Canseled = "Отменено",
}

export class Question {
  constructor(
    readonly id: string,
    readonly status: QuestionStatus,
    readonly title: string,
    readonly text: string,
    readonly createAt: Date,

    readonly answerId: string,
  ) {}

  static ParseStatus(status: string): QuestionStatus | undefined {
    const matchedStatus = Object.values(QuestionStatus).find(
      (s) => s === status,
    );
    return matchedStatus;
  }
}
