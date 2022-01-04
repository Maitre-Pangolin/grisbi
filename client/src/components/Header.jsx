import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, selectIsLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import ROUTES from "../app/routes";

const pages = [
  { label: "Current Month", link: ROUTES.currentMonthlyRoute() },
  { label: "Monthly Totals", link: ROUTES.monthsRoute() },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleButton = () => {
    isLogin ? dispatch(logoutThunk()) : navigate("/signin");
  };

  return (
    <AppBar position='static' sx={{}}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/*MEDIUM DISPLAY APP BAR*/}
          <Typography
            variant='h6'
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}>
            GRI$BI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                disabled={!isLogin}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  navigate(page.link);
                }}>
                {page.label}
              </Button>
            ))}
          </Box>
          {/*SMALL DISPLAY APP BAR*/}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    navigate(page.link);
                    handleCloseNavMenu();
                  }}>
                  <Typography textAlign='center'>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            GRI$BI
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant='contained'
              color={!isLogin ? "info" : "error"}
              onClick={handleButton}
              size='small'>
              {!isLogin ? "Sign In" : "Sign Out"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
