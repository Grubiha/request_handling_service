import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./question";

@Entity("answer")
export class AnswerEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  text!: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @OneToOne(() => QuestionEntity, (question) => question.answer)
  question!: QuestionEntity;
}
