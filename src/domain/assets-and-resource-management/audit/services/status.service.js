import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const STATUS_CHECK_PATH = import.meta.env.VITE_STATUS_CHECK_ENDPOINT_PATH

export class StatusService {
    async getStatusServices(vehicleId) {
        try {
            const response = await axios.get(`${BASE_URL}${STATUS_CHECK_PATH}?vehicleId=${vehicleId}`)
            return response.data[0]
        } catch (error) {
            console.error('Error fetching system status:', error)
            return null
        }
    }
}
