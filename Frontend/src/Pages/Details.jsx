import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "leaflet/dist/leaflet.css";
import { Favorite, FavoriteBorder } from "@mui/icons-material"; // Import icons for wishlist

const Details = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const token = localStorage.getItem("token");
    const propertyId = localStorage.getItem("propertyId"); // Get propertyId from localStorage

    if (!propertyId || !token) {
      setError("Please log in and select a property.");
      setLoading(false);
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9090/property/${propertyId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const data = await response.json();
        setProperty(data);
        fetchCoordinates(data.location);
      } catch (error) {
        setError("Error fetching property details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCoordinates = async (location) => {
      try {
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates({ lat, lon });
        } else {
          setError("Could not find the location on the map.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setError("Failed to fetch coordinates.");
      }
    };

    fetchPropertyDetails();
  }, []); // Only run on component mount

  const handleWishlistClick = () => {
    setIsWishlist((prev) => !prev);

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!isWishlist) {
      wishlist.push(property);
    } else {
      wishlist = wishlist.filter((item) => item.propertyId !== property.propertyId);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleBuyNowClick = () => {
    navigate("/order-details"); // Navigate to the order details page
  };

  if (loading) {
    return <Typography variant="h6" color="textSecondary">Loading property details...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const { image, propertyName, price, location, description } = property || {};

  return (
    <Box sx={{ padding: 2, marginTop: "60px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {property ? (
        <Grid container spacing={4} sx={{ maxWidth: "1200px" }}>
          {/* Image Section */}
          <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "400px" }}>
            {image && (
              <img
                src={image}
                alt={propertyName}
                style={{
                  width: "100%",
                  height: "100%",  // Set to fixed height
                  objectFit: "cover",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="property-image"
              />
            )}

            <Box
              sx={{
                position: "absolute",
                top: 35,
                right: 10,
                zIndex: 1,
                cursor: "pointer",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
              onClick={handleWishlistClick}
            >
              {isWishlist ? (
                <>
                  <Favorite color="error" fontSize="large" />
                  <Typography variant="caption" sx={{ color: "red", marginTop: 1 }}>Wishlist</Typography>
                </>
              ) : (
                <>
                  <FavoriteBorder color="error" fontSize="large" />
                  <Typography variant="caption" sx={{ color: "red", marginTop: 1 }}>Wishlist</Typography>
                </>
              )}
            </Box>
          </Grid>

          {/* Property Details Section */}
          <Grid item xs={12} sm={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "400px" }}>
            <Card sx={{ width: "100%", padding: 2, height: "100%" }}>
              <CardContent>
                <Typography variant="h4" sx={{ marginBottom: 2 }}>{propertyName}</Typography>
                <Typography variant="body2">Price: Rs {price}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>Location: {location}</Typography>
                <Typography variant="body2">{description}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} sm={4} sx={{ height: "400px" }}>
            {coordinates ? (
              <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={13} style={{ width: "100%", height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[coordinates.lat, coordinates.lon]} icon={new L.Icon({
                  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })}>
                  <Popup>{propertyName}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <Typography variant="body2">Location not found on map.</Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">No property details found.</Typography>
      )}

      {/* Action Buttons */}
      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Grid container justifyContent="center" spacing={2}>
          {/* Contact Agent Button */}
          <Grid item>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Contact Agent
            </Button>
          </Grid>

          {/* Buy Now Button */}
          <Button
  variant="contained"
  color="primary"
  sx={{ marginRight: 2 }}
  onClick={() => navigate("/order-details", { state: { property } })}
>
  Buy now
</Button>

          {/* Go to Wishlist Button */}
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => navigate("/wishlist")}>
              Go to Wishlist
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Details;