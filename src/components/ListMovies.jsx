import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieThunk } from "../features/modules/movieSlice";
import { setPage, setQuery } from "../features/modules/paginacaoSlice";
import { toggleFavorite } from '../features/modules/favoriteSlice';
import MovieCard from "../components/MovieCard";
import { Paginacao } from "../components/Paginacao";
import {
    Box, TextField, Typography, CircularProgress, Alert, Snackbar
} from '@mui/material';

const ListMovies = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector(state => state.movies);
    const { totalResults, page, query } = useSelector(state => state.paginacao);
    const favorites = useSelector(state => state.favorites.list);
    const [searchInput, setSearchInput] = useState(query);
    const [snackbarState, setSnackbarState] = useState({ open: false, message: '', severity: 'success' });


    const isDarkMode = useSelector(state => state.theme.isDarkMode);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== query) {
                dispatch(setPage(1));
                dispatch(setQuery(searchInput));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput, dispatch, query]);


    useEffect(() => {
        if (query.trim().length >= 3) {
            dispatch(movieThunk({ query, page }));
        } else if (query.trim() === '' && movies.length > 0) {
            dispatch(setQuery(''));
            dispatch(setPage(1));
        }
    }, [query, page, dispatch, movies.length]);


    const handleToggleFavorite = useCallback((movie) => {
        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
        dispatch(toggleFavorite(movie));
        setSnackbarState({
            open: true,
            message: isFavorite ? `Filme "${movie.Title}" removido dos favoritos.` : `Filme "${movie.Title}" adicionado aos favoritos!`,
            severity: 'success',
        });
    }, [dispatch, favorites]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarState({ ...snackbarState, open: false });
    };


    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (error) {
            return (
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            );
        }

        if (query.trim() === '') {
            return (
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="h5">Comece a buscar filmes! </Typography>
                    <Typography variant="body1">Digite o nome de um filme na caixa de busca acima para começar.</Typography>
                </Box>
            );
        }

        if (movies.length === 0) {
            return (
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="h5">Nenhum resultado encontrado.</Typography>
                    <Typography variant="body1">Tente uma busca diferente.</Typography>
                </Box>
            );
        }

        return (
            <Box>
                <Box sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    justifyItems: 'center'
                }}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} onToggleFavorite={handleToggleFavorite} />
                    ))}
                </Box>
                {totalResults > movies.length && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <Paginacao totalResults={totalResults} page={page} />
                    </Box>
                )}
            </Box>
        );
    };

    return (

        <Box sx={{ 
            minHeight: '100vh', 
            paddingBottom: '200px', 
            bgcolor: isDarkMode ? '#121212' : '#f5f5f5', 
            color: isDarkMode ? '#e0e0e0' : '#000000', 
            p: 4 
        }}>
            <Typography variant="h4" align="center" sx={{ my: 4, fontWeight: 'bold' }}>
                {query.trim() === '' ? 'Buscar Filmes' : `Resultados para "${query}"`}
            </Typography>

            <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <TextField
                        label="Busque por um filme em inglês..."
                        aria-label="Campo de busca de filmes"
                        variant="outlined"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        fullWidth
                        sx={{ input: { color: isDarkMode ? 'white' : 'black' }, label: { color: isDarkMode ? '#aaa' : '#555' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: isDarkMode ? '#aaa' : '#555' }, '&:hover fieldset': { borderColor: isDarkMode ? 'white' : 'black' }, '&.Mui-focused fieldset': { borderColor: isDarkMode ? 'yellow' : 'primary.main' } } }}
                    />
                </Box>
            </Box>

            <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
                {renderContent()}
            </Box>

            <Snackbar
                open={snackbarState.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ListMovies;