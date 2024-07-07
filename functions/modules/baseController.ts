export class BaseController {
    public sendResponse (data: any, success=false, statusCode=400, message="Error") {
        return { data, success, statusCode, message }
    }
}
