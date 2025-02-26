import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AnswerEntity } from "./answer";

@Entity("question")
export class QuestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: "Новое" })
  status!: string;

  @Column()
  title!: string;

  @Column()
  text!: string;

  @Column({ type: "timestamp", default: () => "now()" })
  created_at!: Date;

  @Column({ type: "uuid", nullable: true, unique: true })
  answer_id!: string;

  @OneToOne(() => AnswerEntity, (answer) => answer.question, { nullable: true })
  @JoinColumn({ name: "answer_id" })
  answer!: AnswerEntity;
}
