import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { movieThunk } from "../features/modules/movieSlice";
import { setPage, setQuery } from "../features/modules/paginacaoSlice";
import { useAppSelector } from "../features/hooks";
import MovieCard from "./MovieCard";
import { Paginacao } from "../components/Paginacao";
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';



const ListMovies = () => {
    const dispatch = useDispatch();
    const movies = useAppSelector(state => state.movies.movies);
    const loading = useAppSelector(state => state.movies.loading);
    const error = useAppSelector(state => state.movies.error);
    const totalResults = useAppSelector(state => state.paginacao.totalResults);
    const page = useAppSelector(state => state.paginacao.page);
    const query = useAppSelector(state => state.paginacao.query);
    const [searchInput, setSearchInput] = useState(query);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput.trim().length >= 3 && searchInput !== query) {
                dispatch(setQuery(searchInput));
                dispatch(setPage(1));
            } else if (searchInput.trim().length < 3 && query.trim() !== '') {

                dispatch(setQuery(''));
                dispatch(setPage(1));
            }
        }, 8000);

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, dispatch, query]);


    useEffect(() => {
        if (query.trim().length >= 3) {
            dispatch(movieThunk({ query, page }));
        }
    }, [query, page, dispatch]);

    const handleSearch = () => {
        dispatch(setQuery(searchInput));
        dispatch(setPage(1));
    };
    

    let content;

    if (loading) {
        content = (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
            </Box>
        );
    } else if (error) {
        content = (
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    } else if (query.trim() === '' || movies.length === 0) {
        content = (
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h5">Comece a buscar filmes!</Typography>
                <Typography variant="body1">Digite o nome de um filme na caixa de busca acima para começar.</Typography>
            </Box>
        );
    } else {
        content = (
            <Box>
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
                {totalResults > movies.length && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <Paginacao totalResults={totalResults} page={page} />
                    </Box>
                )}
            </Box>
        );
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
                        aria-label="Campo de busca de filmes"
                        variant="outlined"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        aria-label="Botão para buscar filmes"
                    >
                        Buscar
                    </Button>
                </Box>
            </Box>
            
            <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
                {content}
            </Box>
        </div>
    );
};

export default ListMovies;