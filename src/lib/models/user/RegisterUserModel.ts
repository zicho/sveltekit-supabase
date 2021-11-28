import { ValidationResult } from "../core/ValidationResult";

export class RegisterUserModel {
    public email: string;
    public username: string;
    public password: string;
    public confirmPassword: string;

    public validate(): ValidationResult {
        if(!this.email || !this.password || !this.confirmPassword) {
            return ValidationResult.getNegative('Required fields are empty')
        }

        if(this.password != this.confirmPassword) {
            return ValidationResult.getNegative('Passwords do not match')
        }

        return ValidationResult.getPositive();
    }
}
