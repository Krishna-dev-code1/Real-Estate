import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TnC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          pt: 12, // Prevents collision with the header
          pb: 8 
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
          <Typography 
            variant="h3" 
            gutterBottom 
            textAlign="center"
            sx={{ fontWeight: "bold", color: "#123456" }}
          >
            Terms & Conditions
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            By using our website and services, you agree to the following terms and conditions.
          </Typography>

          <Box component="ul" sx={{ pl: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
            <li>All content on this website is for informational purposes only.</li>
            <li>ExcelEstate reserves the right to modify, update, or terminate services without prior notice.</li>
            <li>Users must not misuse the website or engage in fraudulent activities.</li>
          </Box>

          {/* Left-aligned Contact Us text without underline or color change */}
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            For a complete list of terms, please{" "}
            <Box 
              component="span"
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/contact")}
            >
              contact us
            </Box>.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default TnC;
