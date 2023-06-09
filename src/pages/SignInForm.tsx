import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(120),
});

function SignInForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: IFormInput) => {
    await axios.post("http://localhost:8080/sign/authenticate", {
      email: data.email,
      password: data.password,
    });
  };

  const handleVisibilityPassword = (): void => {
    setShowPassword((prevPasswordState) => !prevPasswordState);
  };

  return (
    <Container maxWidth="xs">
      <Typography
        variant="h3"
        gutterBottom
        style={{ marginTop: "32px", textAlign: "center" }}
        color="primary"
      >
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          variant="outlined"
          margin="normal"
          label="email"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
          fullWidth
          required
          style={{ marginBottom: "12px" }}
        ></TextField>
        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          label="Password"
          type={showPassword ? "text" : "password"}
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          fullWidth
          required
          style={{ marginBottom: "32px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {showPassword ? (
                  <VisibilityIcon
                    style={{ fontSize: "16px", cursor: "pointer" }}
                    onClick={handleVisibilityPassword}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ fontSize: "16px", cursor: "pointer" }}
                    onClick={handleVisibilityPassword}
                  />
                )}
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button type="submit" fullWidth variant="contained">
          Sign In
        </Button>
      </form>
      <Typography style={{ fontSize: "16px", marginTop: "14px" }}>
        <Link href="#">Create an Account now!</Link>
      </Typography>
    </Container>
  );
}

export default SignInForm;
