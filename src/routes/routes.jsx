import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Movies } from "../pages/Movies";
import MovieDetail from "../pages/MovieDetail";
import Favoritos from "../pages/Favoritos";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },

    {
        path: "/movies",
        element: <Movies />
    },



    {
        path: "/movie/:imdbID",
        element: <MovieDetail />
    },

    {
        path: "/favoritos",
        element: <Favoritos />
    },

]);