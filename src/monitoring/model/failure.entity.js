export class Failure {
    constructor({
                    id = 0,
                    suggestSolution = '',
                    badPracticeId = 0,
                    odbErrorId = 0,
                    urgency = ''

                } = {}) {
        this.id = id;
        this.suggestSolution = suggestSolution;
        this.badPracticeId = badPracticeId;
        this.odbErrorId = odbErrorId;
        this.urgency = urgency;
    }
}