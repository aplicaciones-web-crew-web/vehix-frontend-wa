export class OdbError {
    constructor({
                    id = 0,
                    errorCode = '',
                    errorTitle = '',
                    errorType = '',

                } = {}) {
        this.id = id;
        this.errorCode = errorCode;
        this.errorTitle = errorTitle;
        this.errorType = errorType;
    }
}