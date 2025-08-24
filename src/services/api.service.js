import axios from "axios";


const VITE_OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const api = axios.create({
 baseURL: "http://www.omdbapi.com/",
 params: {
  apikey: VITE_OMDB_API_KEY, 
 },
});

export async function searchMovies(title, page = 1) {
    try {
        const response = await api.get("/", {
            params: {
                s: title,
                page: page,
            },
        });
        if (response.data.Response === "False") {
            throw new Error(response.data.Error || "Nenhum filme encontrado.");
        }
        return response.data;
    } catch (error) {
        console.error("Error searching movies:", error.message);
        throw error;
    }
}

export async function getMovieDetails(imdbID) {
    try {
        const response = await api.get("/", {
            params: {
                i: imdbID,
            },
        });
        if (response.data.Response === "False") {
            throw new Error(response.data.Error || "Não foi possível carregar os detalhes.");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error.message);
        throw error;
    }
}
