class ApiError extends Error {
    status;
    message;
    constructor(code, message) {
        super();
        this.status = code || 503;
        this.message = message;
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
}
export default ApiError;
//# sourceMappingURL=ApiError.js.map