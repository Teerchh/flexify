import axios, { type AxiosError } from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${API_KEY}`,
    },
})

// Normalize API errors into a friendly, consistent message.
httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ status_message?: string }>) => {
        const message =
            error.response?.data?.status_message ||
            error.message ||
            "Something went wrong. Please try again.";
        return Promise.reject(new Error(message));
    }
);

export default httpClient