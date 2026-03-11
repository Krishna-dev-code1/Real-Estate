import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const navigate = useNavigate();

  const handleRemoveFromWishlist = (propertyId) => {
    const updatedWishlist = wishlist.filter((property) => property.id !== propertyId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>

      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Back to Properties
      </Button>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {wishlist.length === 0 ? (
          <Typography>No properties in wishlist.</Typography>
        ) : (
          wishlist.map((property) => (
            <Grid item key={property.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={property.imageUrls?.[0] || "default-image-url.jpg"}
                  alt={property.propertyTitle}
                />
                <CardContent>
                  <Typography variant="h6">{property.propertyTitle}</Typography>
                  <Typography variant="body1">Price: ₹{property.price.toLocaleString("en-IN")}</Typography>
                  <Typography variant="body2">Location: {property.location}</Typography>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromWishlist(property.id)}
                    style={{ marginTop: "10px" }}
                  >
                    Remove from Wishlist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Wishlist;
