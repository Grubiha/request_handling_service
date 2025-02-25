import { Transform } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";
import { BasicValidator } from "./validator/basic";

export class Env extends BasicValidator {
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @Max(65535)
  readonly PORT!: number;
}
