import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import excelLogo from "../assets/excel_logo.png";
import login from "../assets/login.png";

const Header = ({ isLoggedIn, username, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#123456", width: "100%", zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: "1200px", mx: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
            <img src={excelLogo} alt="XcelEstate Logo" style={{ height: "60px", marginRight: "5px" }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
              XcelEstate
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/buy">Buy</Button>
          <Button color="inherit" component={Link} to="/rent">Rent</Button>
          <Button color="inherit" component={Link} to="/sell">Sell</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={login}
              alt={isLoggedIn ? "Logout" : "Login"}
              height={50}
              width={50}
              style={{ marginLeft: "290px", borderRadius: "50%", cursor: "pointer" }}
              onClick={toggleDrawer(true)}
            />
            {isLoggedIn && (
              <Typography variant="body1" sx={{ color: "white", marginLeft: "10px" }}>
                {username}
              </Typography>
            )}
          </Box>
        </Box>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
              {!isLoggedIn ? (
                <>
                  <ListItem button onClick={handleLoginClick}>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem button onClick={handleRegisterClick}>
                    <ListItemText primary="Register" />
                  </ListItem>
                </>
              ) : (
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
