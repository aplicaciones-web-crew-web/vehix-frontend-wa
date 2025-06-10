import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const END_POINT = import.meta.env.VITE_VEHICLE_LIFE_DATA_ENDPOINT_PATH;

export class Vehicle_lifeService {
    async getAllVehicle(vehicleId){
        const res = await axios.get(`${BASE_URL}${END_POINT}?vehicleID=${vehicleId}`);
        console.log(res.data);
        return res.data;
    }
}