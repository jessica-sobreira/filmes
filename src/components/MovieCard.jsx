import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarsIcon from '@mui/icons-material/Stars';
import StarBorderIcon from '@mui/icons-material/StarBorder'; 
import { useAppSelector } from '../features/hooks';

const MovieCard = ({ movie, onToggleFavorite }) => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=Sem+Poster';

    const navigate = useNavigate();
    
    const favorites = useAppSelector(state => state.favorites.list);
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

    return (
        <Card sx={{ 
            width: '280px',
            height: 'auto',
            margin: 2,
            bgcolor: 'black',
            color: '#e0e0e0',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
                transform: 'scale(1.03)',
            },
        }}>
            <CardActionArea onClick={() => navigate(`/movie/${movie.imdbID}`)}>
                <CardMedia
                    component="img"
                    height="auto"
                    width="200"
                    image={posterUrl}
                    alt={`Poster do filme ${movie.Title}`}
                    sx={{ borderRadius: '12px 12px 0 0' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'yellow' }}>
                        {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#e0e0e0' }}>
                        Ano: {movie.Year}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2, p: 2 }}>
                <Tooltip title="Detalhes do Filme">
                    <IconButton 
                        onClick={() => navigate(`/movie/${movie.imdbID}`)} 
                        aria-label="ver detalhes"
                        sx={{ color: 'primary.main' }}
                    >
                        <AddCircleIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}>
                    <IconButton 
                        onClick={() => onToggleFavorite(movie)} 
                        aria-label="adicionar/remover dos favoritos"
                        sx={{ color: isFavorite ? 'yellow' : 'white' }}
                    >
                        {isFavorite ? <StarsIcon sx={{ fontSize: 30 }} /> : <StarBorderIcon sx={{ fontSize: 30 }} />}
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default MovieCard;