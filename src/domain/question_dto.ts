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

export class UpdateQuestionDto extends BasicValidator {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status!: string;
}

export class FindQuestionDto extends BasicValidator {
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  after!: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  before!: Date;
}
