import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BasicValidator } from "../validator/basic";
import { Transform } from "class-transformer";

export class CreateIssueDto extends BasicValidator {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}

export class UpdateIssueDto extends BasicValidator {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  answer?: string;
}

export class FindIssuesDto extends BasicValidator {
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  after!: Date;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  before!: Date;
}
