import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const END_POINT = import.meta.env.VITE_FAILURES_ENDPOINT_PATH;

export class FailureService {
    async getAllFailures(vehicleId){
        const res = await axios.get(`${BASE_URL}${END_POINT}?vehicleID=${vehicleId}`);
        console.log(res.data);
        return res.data;
    }
}