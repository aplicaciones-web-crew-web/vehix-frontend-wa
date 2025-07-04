import axios from 'axios';

const googleApiUrl = import.meta.env.VITE_GOOGLE_API_URL;
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const cx = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;

const http = axios.create({
    baseURL: googleApiUrl,
    params: {
        key: apiKey,
        cx: cx,
        searchType: 'image'
    }
});

/**
 * @description Service to interact with Google Custom Search API for car images.
 * @class CarsImagesApiService
 * @author u202318274 Julca Minaya Sergio Gino
 */
export class CarsImagesApiService {
    searchImageCar(query) {
        return http.get('',{
            params:{
                q: query,
            }
        })
    }
}