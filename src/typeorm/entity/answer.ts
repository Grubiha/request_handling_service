import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question";

@Entity("answer")
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  text!: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @OneToOne(() => Question, (question) => question.answer)
  question!: Question;
}
