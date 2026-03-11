import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper, CircularProgress } from "@mui/material";

const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:9090/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Invalid credentials" }));
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const response = await loginUser(formData.email, formData.password);

    if (response.error) {
      setError(response.error);
    } else {
      const { token, user } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("id", user.id);
      localStorage.setItem("username", user.name);

      const roleRedirects = {
        ADMIN: "/admin",
        BUYER: "/buy",
        SELLER: "/sell",
        AGENT: "/sell",
      };

      navigate(roleRedirects[user.role] || "/");
      onLogin(user); // Notify the parent component about the login
    }

    setLoading(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
          />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Typography align="center" sx={{ mt: 2 }}>
          <Link to="/register">Don't have an account? Register</Link>
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
