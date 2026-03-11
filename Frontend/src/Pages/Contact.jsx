import React from "react";
import { Box, Typography, Card, CardContent, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Contact = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "20px",
        bgcolor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph sx={{ maxWidth: 600, textAlign: "center" }}>
        Have a question? Reach out to us and we’ll be happy to help!
      </Typography>

      <Card
        sx={{
          maxWidth: 600,
          marginTop: 4,
          padding: 3,
          boxShadow: 5,
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: "bold" }}>
            Company Details
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon color="primary" /> <strong>Branch Address:</strong> Bangalore, Karnataka
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <PhoneIcon color="primary" /> <strong>Toll-Free No:</strong> 1-800-EXCEL-ESTATE
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <EmailIcon color="primary" /> <strong>Email:</strong> excelestate53@gmail.com
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AccessTimeIcon color="primary" /> <strong>Timings:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            Mon-Fri: 10:00 AM to 6:00 PM
            <br />
            Sat-Sun: 10:00 AM to 2:00 PM
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="body1" paragraph>
          For any queries or complaints, please fill out our <strong>Feedback Form</strong>:
        </Typography>
        <Link
          href="https://forms.gle/dummyformlink"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontSize: "18px", fontWeight: "bold", color: "#1976d2" }}
        >
          Submit Feedback
        </Link>
      </Box>
    </Box>
  );
};

export default Contact;