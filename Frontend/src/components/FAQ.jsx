import React from "react";
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          pt: 12, // Prevents header collision
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
            Frequently Asked Questions
          </Typography>

          {[
            {
              question: "What services does ExcelEstate offer?",
              answer: "We provide real estate consulting, property sales, and investment opportunities."
            },
            {
              question: "How can I contact customer support?",
              answer: "You can reach us via our toll-free number 1-800-EXCEL-ESTATE or email us at excelestate53@gmail.com."
            },
            {
              question: "Do you provide virtual property tours?",
              answer: "Yes, we offer virtual tours for select properties. Contact us to schedule a session."
            }
          ].map((faq, index) => (
            <Accordion 
              key={index} 
              sx={{
                mb: 2,
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                "&:hover": { backgroundColor: "#f1f1f1" }
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: "bold" }}>
                <Typography sx={{ fontSize: "1.2rem" }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default FAQ;
