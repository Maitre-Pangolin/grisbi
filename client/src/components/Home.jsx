import React from "react";
import { Button, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "1000px",
        margin: { sm: " 10px auto", md: " 200px auto" },
        padding: "30px 10px",
      }}>
      <img
        alt='Blue rupee'
        src='/android-chrome-512x512.png'
        style={{ width: "300px", paddingBottom: "40px" }}
      />
      <Container
        sx={{
          width: "max-content",
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "normal" },
          gap: "40px",
        }}>
        <Typography
          variant='h4'
          sx={{ fontSize: { xs: "1.5em", md: "2em" }, textAlign: "center" }}>
          Tired of losing track of your rupees ?
        </Typography>
        <Typography variant='h4' sx={{ fontSize: { xs: "1.5em", md: "2em" } }}>
          <strong style={{ color: "#3464eb" }}>Gri$bi</strong> is here for you !
        </Typography>
        <Button
          size='large'
          variant='contained'
          sx={{}}
          onClick={() => navigate("/signup")}>
          Sign Up Now
        </Button>
      </Container>
    </Paper>
  );
};

export default Home;
