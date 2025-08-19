import { Footer } from '../components/Footer';
import { Grid, Typography, Box } from '@mui/material';
import { useAppSelector } from '../features/hooks';
import FavoriteCard from "../components/Favorite";

const Favoritos = () => {

    const favoritos = useAppSelector(state => state.favorites.list);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#121212', color: '#e0e0e0', p: 4 }}>
        

            <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mt: 4, color: 'white' }}>
                My Favorites
            </Typography>
            
            {favoritos.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Typography variant="h5">
                        Você ainda não tem nenhum filme favorito! 🎬
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
                    {favoritos.map((filme) => (
                        <Grid item key={filme.imdbID} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FavoriteCard movie={filme} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Footer />
        </Box>
    );
};

export default Favoritos;