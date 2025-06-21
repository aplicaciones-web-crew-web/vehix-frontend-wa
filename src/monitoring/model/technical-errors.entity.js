export class TechnicalErrors {
    constructor(technicalErrors = {}) {
        this.id = technicalErrors.id || 0;
        this.code = technicalErrors.code || '';
        this.description = technicalErrors.description || '';
        this.suggestion = technicalErrors.suggestion || '';
        this.urgency = technicalErrors.urgency || '';
    }
}