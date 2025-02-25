import { validateSync, ValidationError } from "class-validator";
import { ValidatorError } from "../error";

export abstract class BasicValidator {
  validate(): void {
    const errors: ValidationError[] = validateSync(this);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => {
          return `Property ${error.property} has errors: ${Object.values(error.constraints!).join(", ")}`;
        })
        .join("\n");
      throw new ValidatorError(errorMessage);
    }
  }
}
