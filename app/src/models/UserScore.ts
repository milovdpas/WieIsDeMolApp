import User from "./User";

export default class UserScore {
    user: User;
    score: number;

    constructor(user: User, score: number) {
        this.user = user;
        this.score = score;
    }
}
