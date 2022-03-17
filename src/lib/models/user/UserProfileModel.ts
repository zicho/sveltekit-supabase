export class UserProfileModel {

    constructor(username?: string, description?: string) {
        this.username = username
        this.description = description
    }
    public username: string;
    public description: string;

}
