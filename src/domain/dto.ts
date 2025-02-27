import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BasicValidator } from "../validator/basic";
import { Transform } from "class-transformer";

export class CreateQuestionDto extends BasicValidator {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}

export class FindQuestionDto extends BasicValidator {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class RespondDto extends BasicValidator {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}

export class FindQuestionsDto extends BasicValidator {
  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  after?: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  before?: Date;
}
