import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieThunk } from "../features/modules/movieSlice";
import { setPage, setQuery } from "../features/modules/paginacaoSlice";
import MovieCard from "./MovieCard";
import { Paginacao } from "./Paginacao";
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

export const ListMovies = () => {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');

    const { movies, totalResults, page, query } = useSelector((state) => ({
        movies: state.movies.movies,
        totalResults: state.paginacao.totalResults,
        page: state.paginacao.page,
        query: state.paginacao.query,
    }));
    
    const loading = useSelector((state) => state.movies.loading);

    useEffect(() => {
        if (query) {
            dispatch(movieThunk());
        }
    }, [dispatch, page, query]);

    const handleSearch = () => {
        dispatch(setQuery(searchInput));
        dispatch(setPage(1));
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!movies || movies.length === 0) {
        return <Typography align="center" sx={{ my: 4 }}>Nenhum filme encontrado para "{query}".</Typography>;
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '200px' }} className="p-4 bg-gray-50">
            <Typography variant="h4" align="center" sx={{ my: 4 }}>
                Resultados para "{query}"
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <TextField
                        label="Busque por um filme"
                        variant="outlined"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        fullWidth
                    />
                    <Button variant="contained" onClick={handleSearch} sx={{ minWidth: 120 }}>
                        Buscar
                    </Button>
                </Box>
            </Box>
            
            <Box sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                justifyItems: 'center'
            }}>
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <Paginacao
                    totalResults={totalResults}
                    page={page}
                />
            </Box>
        </div>
    );
};
