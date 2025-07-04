import {Report} from "../model/report.entity.js";

export class ReportAssembler {
    static toEntityFromResource(resource) {
        return new Report(resource);
    }

    static toEntitiesFromResponse(response) {
        if (!response || !response.data || !Array.isArray(response.data)) {
            console.error('Invalid resource: ', response);
            return [];
        }
        return response.data.map(r => this.toEntityFromResource(r));
    }
}