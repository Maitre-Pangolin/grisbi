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
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { signup } from "../api/authAPI";

const emptyForm = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(emptyForm);
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  const handleChange = ({ target }) => {
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setError((prevState) => ({ ...prevState, [target.name]: "" }));
  };

  const handleSubmit = async () => {
    try {
      if (!dataValidation()) throw new Error("data validation");
      await signup(formData);
      setIsSignUp(true);
      setFormData(emptyForm);
    } catch (error) {
      if (error.response.data.duplicate) {
        const { duplicate } = error.response.data;
        if (duplicate === "user_name")
          setError((prevState) => ({
            ...prevState,
            username: "An account with this username already exists",
          }));
        if (duplicate === "email")
          setError((prevState) => ({
            ...prevState,
            email: "An account with this email already exists",
          }));
      }
    }
  };

  const dataValidation = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") {
        setError((prevState) => ({ ...prevState, [key]: "Cannot be empty" }));
        isValid = false;
      }
    });
    if (!emailValidator.validate(formData.email)) {
      setError((prevState) => ({ ...prevState, email: "Wrong email format" }));
      isValid = false;
    }
    return isValid;
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
          <Typography variant='h5'>Sign up to Gri$bi</Typography>
          <Collapse in={isSignUp}>
            <Alert
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {}}>
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              Sign up complete. Please check your email to confirm your account.
            </Alert>
          </Collapse>
          <TextField
            id='firstname'
            type='text'
            label='First Name'
            name='firstname'
            variant='outlined'
            value={formData.firstname}
            error={!(error.firstname === "")}
            helperText={error.firstname}
            onChange={handleChange}
          />
          <TextField
            id='lastname'
            type='text'
            label='Last Name'
            name='lastname'
            variant='outlined'
            error={!(error.lastname === "")}
            helperText={error.lastname}
            value={formData.lastname}
            onChange={handleChange}
          />
          <TextField
            id='username'
            type='text'
            label='User Name'
            name='username'
            variant='outlined'
            error={!(error.username === "")}
            helperText={error.username}
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            id='email'
            label='Email address'
            type='email'
            name='email'
            error={!(error.email === "")}
            helperText={error.email}
            variant='outlined'
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            id='password'
            type='password'
            label='Password'
            name='password'
            error={!(error.password === "")}
            helperText={error.password}
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
            Sign Up
          </Button>
        </Container>
      </form>
      <Box sx={{ p: "20px" }}>
        <Typography variant='body1'>
          Already have an account ? <Link to='/signin'>Sign In</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Signup;
