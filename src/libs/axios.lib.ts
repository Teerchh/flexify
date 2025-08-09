import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${API_KEY}`,
    },
})

export default httpClient