import httpInstance from "../../shared/services/http.instance.js";

export class ReportService {
    resourceEndPoint = import.meta.env.VITE_REPORT_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndPoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndPoint}/${id}`);
    }

    update(id, resource) {
        return httpInstance.put(`${this.resourceEndPoint}/${id}`, resource);
    }
}