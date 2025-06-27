export class BadPractices {
    constructor(badPractices = {}) {
        this.id = badPractices.id || 0;
        this.description = badPractices.description || '';
    }
}