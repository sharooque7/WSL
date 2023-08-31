class ApiError extends Error {
  public status: number;
  public message: string;
  constructor(code: number, message: string) {
    super();
    this.status = code || 503;
    this.message = message;
  }
  static badRequest(message: string) {
    return new ApiError(400, message);
  }
  static internal(message: string) {
    return new ApiError(500, message);
  }
}
export default ApiError;
