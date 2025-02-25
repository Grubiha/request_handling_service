// export type IssueStatus = "Новое" | "В работе" | "Завершено" | "Отменено"

export enum IssueStatus {
  New = "Новое",
  InProcess = "В работе",
  Completed = "Завершено",
  Canseled = "Отменено",
}

export class Issue {
  constructor(
    readonly id: string,
    readonly status: IssueStatus,
    readonly title: string,
    readonly text: string,
    readonly answer: string,
    readonly createAt: Date,
  ) {}

  static ParseStatus(status: string): IssueStatus | undefined {
    const matchedStatus = Object.values(IssueStatus).find((s) => s === status);
    return matchedStatus;
  }
}
