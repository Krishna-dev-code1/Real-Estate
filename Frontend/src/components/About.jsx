import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          pt: 12, // Adjusting to prevent header overlap
          pb: 6, 
          textAlign: "center" 
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ p: 4, borderRadius: 2, backgroundColor: "#f9f9f9" }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#123456" }}>
            About Us
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            ExcelEstate is a leading real estate company committed to providing the best property deals 
            and investment opportunities. With years of experience, we ensure a seamless and trustworthy 
            experience for our clients.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            Our vision is to make real estate transactions simple, transparent, and accessible for everyone. 
            Whether you are buying, selling, or investing, we are here to assist you with expert guidance.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
