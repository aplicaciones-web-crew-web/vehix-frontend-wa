import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT = import.meta.env.VITE_SIMPLE_ISSUES_ENDPOINT_PATH;


export class SimpleIssuesService {
    async getSimpleIssues(vehicleId) {
        const res = await axios.get(`${BASE_URL}${ENDPOINT}?vehicleId=${vehicleId}`);
        console.log("Respuesta del servidor:", res.data);
        return res.data;
    }
}
