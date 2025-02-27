export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static NotFoundError(message: string) {
    return new ApiError(404, message);
  }

  static BadRequestError(message: string) {
    return new ApiError(400, message);
  }

  static ConflictError(message: string) {
    return new ApiError(409, message);
  }
}
