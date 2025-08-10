import { Card, CardMedia, CardContent, Typography, CardActionArea, Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarsIcon from '@mui/icons-material/Stars';

const MovieCard = ({ movie }) => {

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=Sem+Poster';

  return (
    <Card sx={{ maxWidth: 345, margin: 2, flexGrow: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={posterUrl}
          alt={`Poster do filme ${movie.Title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ano: {movie.Year}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <AddCircleIcon sx={{ fontSize: 30, color: 'primary.main', display: 'flex', justifyContent: 'center' }} />
            <StarsIcon sx={{ fontSize: 30, color: 'gold', display: 'flex', justifyContent: 'center' }} />
          </Box>
        
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
