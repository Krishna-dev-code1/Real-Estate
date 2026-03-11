import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        bgcolor: "#123456", // Matching Header.jsx color
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">© 2025 ExcelEstate. All rights reserved.</Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 1 }}>
        <Link href="/about" color="inherit" sx={{ textDecoration: "none" }}>About Us</Link>
        <Link href="/careers" color="inherit" sx={{ textDecoration: "none" }}>Careers</Link>
        <Link href="/terms" color="inherit" sx={{ textDecoration: "none" }}>Terms & Conditions</Link>
        <Link href="/privacy" color="inherit" sx={{ textDecoration: "none" }}>Privacy Policy</Link>
        <Link href="/faqs" color="inherit" sx={{ textDecoration: "none" }}>FAQs</Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Facebook sx={{ cursor: "pointer" }} />
        <Instagram sx={{ cursor: "pointer" }} />
        <Twitter sx={{ cursor: "pointer" }} />
      </Box>
    </Box>
  );
};

export default Footer;
