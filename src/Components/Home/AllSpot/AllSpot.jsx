import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const AllSpot = () => {
  const [spots, setSpots] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://my-server-black.vercel.app/countriedcard")
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((error) => console.error("Error fetching tourist spots:", error));
  }, []);

  const sortedSpots = [...spots].sort((a, b) =>
    sortOrder === "asc" ? a.average_cost - b.average_cost : b.average_cost - a.average_cost
  );

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Helmet>
        <title>Travellette | All Spot</title>
      </Helmet>

      {/* Sort Dropdown */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort by Cost</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort by Cost"
          >
            <MenuItem value="asc">Low to High</MenuItem>
            <MenuItem value="desc">High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Grid Layout */}
      <Grid container spacing={4}>
        {sortedSpots.map((spot) => (
          <Grid item xs={12} sm={6} md={4} key={spot._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: 5,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                image={spot.image}
                alt={spot.tourists_spot_name}
                sx={{ height: 200, objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {spot.tourists_spot_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  🌍 {spot.country_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  💰 ${spot.average_cost}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  👥 Visitors: {spot.totalVisitorsPerYear}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⏳ {spot.travel_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📅 Best Season: {spot.seasonality}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    backgroundColor: "#1e88e5",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                  onClick={() => navigate(`/spot/${spot._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllSpot;
