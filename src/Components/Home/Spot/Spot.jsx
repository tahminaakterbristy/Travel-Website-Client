import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
  Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Spot = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://my-server-black.vercel.app/countriedcard/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => {
        setSpot(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Card sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 5 }}>
        <Grid container spacing={2}>
          {/* Left side - Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="100%"
              image={spot.image}
              alt={spot.tourists_spot_name}
              sx={{ objectFit: "cover", height: "100%" }}
            />
          </Grid>

          {/* Right side - Content */}
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {spot.tourists_spot_name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                🌍 {spot.country_name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                📅 Best Season: <strong>{spot.seasonality}</strong>
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                ⏳ Travel Time: <strong>{spot.travel_time}</strong>
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                💰 Average Cost: <strong>${spot.average_cost}</strong>
              </Typography>

              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  onClick={() => navigate(`/add-spot/${id}`)}
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Add to List
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Spot;
