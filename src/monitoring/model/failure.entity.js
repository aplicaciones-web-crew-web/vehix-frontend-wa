export class Failure {
    constructor({
                    id = 0,
                    title = '',
                    suggestSolution = '',
                    badPracticeId = 0,
                    odbErrorId = 0,
                    urgency = ''

                } = {}) {
        this.id = id;
        this.title = title;
        this.suggestSolution = suggestSolution;
        this.badPracticeId = badPracticeId;
        this.odbErrorId = odbErrorId;
        this.urgency = urgency;
    }
}