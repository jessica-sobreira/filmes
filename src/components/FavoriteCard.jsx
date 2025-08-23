import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { DeleteOutline as DeleteIcon } from '@mui/icons-material';
import { useAppDispatch } from '../features/hooks';
import { toggleFavorite } from '../features/modules/favoriteSlice';

const FavoriteCard = ({ movie }) => {
    const dispatch = useAppDispatch();

    const handleRemoveFavorite = () => {
        dispatch(toggleFavorite(movie));
    };

    return (
        <Card
            sx={{
                width: 250,
                minHeight: 450,
                bgcolor: '#202020',
                color: '#e0e0e0',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(32,32,32,0.8) 0%, rgba(40,40,40,0.8) 100%)',
                    zIndex: 1,
                }
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=Poster+Not+Available'}
                alt={movie.Title}
                sx={{ objectFit: 'cover', position: 'relative', zIndex: 2 }}
            />
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {movie.Title}
                </Typography>
                <Typography variant="body2" color="#b0b0b0">
                    {movie.Year}
                </Typography>
            </CardContent>
            <Box sx={{ position: 'absolute', bottom: 10, right: 10, zIndex: 3 }}>
                <IconButton
                    aria-label="remover dos favoritos"
                    onClick={handleRemoveFavorite}
                    sx={{
                        color: '#ff5252',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out',
                        '&:hover': {
                            color: '#ff1744',
                            transform: 'scale(1.1)',
                            bgcolor: 'rgba(0,0,0,0.7)',
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default FavoriteCard;