import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "./answer";

export enum QuestionStatus {
  NEW = "Новое",
  IN_PROCESS = "В процессе",
  COMPLETED = "Выполнено",
  CANCELED = "Отменено",
}

@Entity("question")
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: QuestionStatus.NEW })
  status!: string;

  @Column()
  title!: string;

  @Column()
  text!: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @Column({ type: "uuid", nullable: true, unique: true })
  answer_id!: string;

  @OneToOne(() => Answer, (answer) => answer.question, { nullable: true })
  @JoinColumn({ name: "answer_id" })
  answer!: Answer;
}
