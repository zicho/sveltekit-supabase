export class ValidationResult {
    success: boolean;
    message: string;


    constructor(success: boolean, message: string) {
        this.success = success
        this.message = message
    }


    public static getPositive(message?: string) {
        return new ValidationResult(true, message)
    }

    public static getNegative(message: string) {
        return new ValidationResult(false, message)
    }
}