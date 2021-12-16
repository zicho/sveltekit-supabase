export class UserProfileModel {

    constructor(username?: string, desc?: string) {
        this.username = username
        this.desc = desc
    }
    public username: string;
    public desc: string;

}
