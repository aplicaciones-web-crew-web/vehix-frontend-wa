export class SimpleIssues {
    constructor(simpleIssues = {}) {
        this.id = simpleIssues.id || 0;
        this.description = simpleIssues.description || '';
        this.urgency = simpleIssues.urgency || '';
    }
}