import React, { useState, useEffect } from "react";
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
import emailValidator from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import {
  signinThunk,
  resetLoginError,
  selectIsError,
  setLoginError,
  selectIsLogin,
} from "./authSlice";
import { useNavigate } from "react-router";

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const isError = useSelector(selectIsError);
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  const handleChange = ({ target }) => {
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = () => {
    if (emailValidator.validate(formData.email) && formData.password !== "") {
      dispatch(signinThunk(formData));
    } else {
      dispatch(setLoginError());
    }
    setFormData({ email: "", password: "" });
  };

  return (
    <Paper elevation={2} sx={{ pt: "10px" }}>
      <form>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
          <Typography variant='h5'>Sign in to Gri$bi</Typography>
          <Collapse in={isError}>
            <Alert
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    dispatch(resetLoginError());
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
            autoComplete='on'
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
          New to Gri$bi ? <Link to='/signup'>Create an account</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default SigninForm;
