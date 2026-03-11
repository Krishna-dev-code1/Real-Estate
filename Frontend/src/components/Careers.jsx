import React from "react";
import { Box, Typography, Container, Button, Paper } from "@mui/material";

const Careers = () => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          pt: 12, // Prevents collision with the header
          pb: 8, 
          textAlign: "center" 
        }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: 5, 
            borderRadius: 3, 
            backgroundColor: "#f9f9f9", 
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#123456" }}>
            Join Our Team
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            At <b>ExcelEstate</b>, we believe in innovation, teamwork, and customer satisfaction. 
            If you are passionate about real estate and want to build an exciting career, we want to hear from you!
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            Explore opportunities in <b>sales, marketing, technology, and customer support</b>. 
            We offer competitive salaries, growth opportunities, and a collaborative work culture.
          </Typography>

          <Button 
            variant="contained" 
            color="primary" 
            href="/apply"
            sx={{ 
              mt: 3, 
              px: 4, 
              py: 1.5, 
              fontSize: "1rem", 
              borderRadius: "8px", 
              textTransform: "none", 
              "&:hover": { backgroundColor: "#0e2a47" }
            }}
          >
            View Open Positions
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Careers;
