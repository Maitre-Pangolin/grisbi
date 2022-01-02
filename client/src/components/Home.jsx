import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <img
          alt='Blue rupee'
          src='/android-chrome-512x512.png'
          style={{ width: "300px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            justifyContent: "space-around",
            alignItems: "flex-end",
            minWidth: "600px",
            height: "300px",
          }}>
          <Typography variant='h4'>
            Tired of losing track of your rupees ?
          </Typography>
          <Typography variant='h4' align='right'>
            <strong style={{ color: "#3464eb" }}>Gri$bi</strong> is here for you
            !
          </Typography>
          <Button
            size='large'
            variant='contained'
            sx={{
              width: "45%",
            }}
            onClick={() => navigate("/signup")}>
            Sign Up Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
