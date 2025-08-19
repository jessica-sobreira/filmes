import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from "../services/api.service";
import { Box, Card, CardContent, CardMedia, Grid, Typography, CircularProgress, Button } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (imdbID) {
      const fetchMovieDetails = async () => {
        try {
          setIsLoading(true);
          const data = await getMovieDetails(imdbID);
          if (data.Response === "True") {
            setMovie(data);
            setIsError(false);
          } else {
            setMovie(null);
            setIsError(true);
          }
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovieDetails();
    }
  }, [imdbID]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            bgcolor: '#121212',
            color: '#fff',
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h5" sx={{ mt: 2 }}>Carregando detalhes...</Typography>
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            minHeight: '100vh',
            bgcolor: '#121212',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" color="error">Erro ao carregar os detalhes do filme.</Typography>
          <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </Box>
      )}

      {!isLoading && !isError && movie && (
        <Box
          sx={{
            p: 4,
            minHeight: '100vh',
            bgcolor: '#121212',
            color: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Grid container spacing={4} sx={{ width: 1200, display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sem+Poster'}
                alt={`Poster do filme ${movie.Title}`}
                sx={{
                  height: 'auto',
                  width: '100%',
                  maxWidth: 350,
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.0)',
                  },
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x450?text=Sem+Poster';
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(25, 25, 25, 0.8)',
                color: '#e0e0e0',
                borderRadius: '16px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h3" component="h1" sx={{ color: 'yellow', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', textAlign: 'center' }}>
                    {movie.Title} ({movie.Year})
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                    Gênero: {movie.Genre} | Duração: {movie.Runtime} | Diretor: {movie.Director}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Sinopse: {movie.Plot}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Atores: {movie.Actors}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Avaliação IMDB: {movie.imdbRating}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    País: {movie.Country}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button 
                    variant="contained"
                    size="small" 
                    startIcon={<ReplyIcon />} 
                    onClick={() => navigate("/movies")} 
                    sx={{ mt: 2, display: "block", mx: "auto" }}
                >
                    Voltar
                </Button>
              </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default MovieDetail;
