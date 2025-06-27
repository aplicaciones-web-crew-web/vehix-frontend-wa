import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const END_POINT = import.meta.env.VITE_BAD_PRACTICES_ENDPOINT_PATH;


export class IssuesService {
    async getAllBadPractices(vehicleId) {
        const res = await axios.get(`${BASE_URL}${END_POINT}?vehicleId=${vehicleId}`);
        console.log(res.data);
        return res.data;
    }
}
