import React, { useRef, useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Card, CardContent, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import homeBg from "../assets/home_bg.jpg";

const Home = () => {
  const testimonialsRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    location: "",
    price: "",
    size: "",
    category: "",
    type: "buy",
  });

  const scrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/${searchParams.type}?${queryString}`);
  };

  return (
    <>
      {/* Search Section */}
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${homeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        <Typography variant="h2" fontWeight="bold">Find Your Dream Property</Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          <Link to="/buy" style={{ textDecoration: "none", fontWeight: "bold", color: "inherit" }}>Buy</Link> | 
          <Link to="/rent" style={{ textDecoration: "none", fontWeight: "bold", color: "inherit" }}> Rent</Link> | 
          <Link to="/sell" style={{ textDecoration: "none", fontWeight: "bold", color: "inherit" }}> Sell</Link>
        </Typography>
        
        {/* Search Bar in Grid */}
        <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", p: 3, borderRadius: "10px", backdropFilter: "blur(8px)", mt: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            {Object.entries({ location: "Location", price: "Price", size: "Size (sq ft)", category: "Category" }).map(([key, label]) => (
              <Grid item xs={12} sm={6} md={2.4} key={key}>
                <TextField
                  label={label}
                  name={key}
                  value={searchParams[key]}
                  onChange={handleSearchChange}
                  variant="outlined"
                  fullWidth
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={2.4}>
              <TextField
                select
                label="Type"
                name="type"
                value={searchParams.type}
                onChange={handleSearchChange}
                variant="outlined"
                fullWidth
                sx={{ bgcolor: "white" }}
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
              </TextField>
            </Grid>
            {/* Centered and Smaller Search Button */}
            <Grid item xs={12} sm={6} md={2.4} sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ width: "50%", minWidth: "100px" }} // Adjust width and min-width as needed
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Scroll Indicator */}
        <Box sx={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)" }}>
          <Button onClick={scrollToTestimonials} sx={{ color: "white" }}>
            <ExpandMoreIcon sx={{ fontSize: 40 }} />
          </Button>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box ref={testimonialsRef} sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundImage: `url(${homeBg})`, backgroundSize: "cover", backgroundPosition: "center", color: "#fff", textAlign: "center", padding: "20px", position: "relative" }}>
        <Typography variant="h4" fontWeight="bold">What Our Clients Say</Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mt: 3 }}>
          {[{ id: 1, text: "Amazing service! Found my dream home effortlessly.", author: "Amit P." },
            { id: 2, text: "Professional and smooth process. Highly recommended!", author: "Riya S." },
            { id: 3, text: "I sold my house in just 5 days! Thank you.", author: "Aniket D." },
            { id: 4, text: "They really care about your needs and help at every step.", author: "Pooja J." }].map((testimonial) => (
            <Card key={testimonial.id} sx={{ width: "250px", bgcolor: "rgba(255,255,255,0.9)", borderRadius: "10px", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" } }}>
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic", color: "#333" }}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold", color: "#555" }}>
                  - {testimonial.author}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Scroll Indicator to Footer */}
        <Box sx={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)" }}>
          <Button onClick={scrollToFooter} sx={{ color: "white" }}>
            <ExpandMoreIcon sx={{ fontSize: 40 }} />
          </Button>
        </Box>
      </Box>
      
      <Box ref={footerRef}></Box>
    </>
  );
};

export default Home;