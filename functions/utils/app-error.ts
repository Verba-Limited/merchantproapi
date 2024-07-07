export class AppError extends Error {
    public message: string;
    public statusCode: number;
    public data: any;
    constructor(message: string, data: any = null, statusCode: number = 400) {
       super(message);
       Error.captureStackTrace(this, AppError);
       this.message = message;
       this.statusCode = statusCode;
       this.data = data;
    }
}
