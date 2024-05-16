import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
// import { UserFormLogin } from "../reduxToolKit/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { UserFormLogin } from "../../redux/THUNK/USER-THUNK/userslicethunk";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: any = useDispatch();
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission (e.g., login logic)
    console.log("Email:", email);
    console.log("Password:", password);
    await dispatch(UserFormLogin({ email: email, password: password }));
    router.push("/pages/inbox");
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
