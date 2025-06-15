import axios from 'axios';

const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export class NewsService {
    async getNews() {
        const url = `${NEWS_API_URL}?apikey=${NEWS_API_KEY}&q=automotive&language=es,en&category=business`;
        const res = await axios.get(url);
        return res.data;
    }
}