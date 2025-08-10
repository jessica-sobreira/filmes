import axios from "axios";

export const api = axios.create({
 baseURL: "http://www.omdbapi.com/",
 params: {
  apikey: "b87b88b9",
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
        return response.data;
    } catch (error) {
        console.error("Error searching movies:", error);
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
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}