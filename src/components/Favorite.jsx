import { useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, Snackbar, Alert } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { toggleFavorite } from "../features/modules/favoriteSlice"; 

const FavoriteCard = ({ movie }) => {
    const dispatch = useAppDispatch();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

 
    const favoritesList = useAppSelector((state) => state.favorites.list);
    const isMovieInFavorites = favoritesList.some((fav) => fav.imdbID === movie.imdbID);


    const handleToggleFavorite = () => {
 
        dispatch(toggleFavorite(movie));

        setAlertMessage(isMovieInFavorites ? "Filme removido dos favoritos." : "Filme adicionado aos favoritos.");
        setIsAlertOpen(true);
    };

    return (
        <>
            <Card sx={{ display: "flex", mb: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x220?text=Sem+Poster'}
                    alt={movie.Title}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent>
                        <Typography variant="h6">{movie.Title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ano: {movie.Year}
                        </Typography>
                    </CardContent>
                    <Button
                        onClick={handleToggleFavorite}
                        startIcon={isMovieInFavorites ? <DeleteIcon /> : <StarIcon />}
                    >
                        {isMovieInFavorites ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                    </Button>
                </Box>
            </Card>

            <Snackbar
                open={isAlertOpen}
                autoHideDuration={3000}
                onClose={() => setIsAlertOpen(false)}
            >
                <Alert onClose={() => setIsAlertOpen(false)} severity="success" sx={{ width: "100%" }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default FavoriteCard;