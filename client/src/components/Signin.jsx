import React, { useState } from "react";
import {
  TextField,
  Container,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(true);

  const handleChange = ({ target }) => {
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = () => {
    setFormData({ email: "", password: "" });
    setIsError(true);
    //IF NOT EMAIL FORMAT OR EMPTY PASSWORD =>ERROR
    // DISPATCH USER LOGIN
  };

  return (
    <Paper
      elevation={2}
      sx={{ width: "400px", m: "auto", pt: "10px", mt: "20px" }}>
      <form>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
          <Typography variant='h4'>Sign in to Gri$bi</Typography>
          <Collapse in={isError}>
            <Alert
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setIsError(false);
                  }}>
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              Incorrect email or password.
            </Alert>
          </Collapse>

          <TextField
            id='email'
            label='Email address'
            type='email'
            name='email'
            variant='outlined'
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            id='password'
            type='password'
            label='Password'
            name='password'
            variant='outlined'
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
            disabled={!formData}>
            Sign in
          </Button>
        </Container>
      </form>
      <Box sx={{ p: "20px" }}>
        <Typography variant='body1'>
          New to Gri$bi? <Link to='/signup'>Create an account</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Signin;
