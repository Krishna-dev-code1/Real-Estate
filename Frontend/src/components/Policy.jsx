import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";

const Policy = () => {
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
            Privacy Policy
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.
          </Typography>

          <Box component="ul" sx={{ pl: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
            <li>We collect only necessary data for providing our services.</li>
            <li>Your data is never shared with third parties without consent.</li>
            <li>You have the right to request data deletion at any time.</li>
          </Box>

          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            For more details, feel free to reach out.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Policy;
