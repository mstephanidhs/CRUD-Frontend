import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface User {
  firstName: String;
  lastName: String;
  jobTitle: String;
  afm: String;
  salary: Number;
  password: String;
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  jobTitle: yup.string().required(),
  afm: yup.string().required(),
  salary: yup.number().required(),
  password: yup.string().required().min(8).max(120),
});

function AddEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });

  const handleVisibilityPassword = (): void => {
    setShowPassword((prevPasswordState) => !prevPasswordState);
  };

  const onSubmit = async (data: User) => {
    await axios
      .post("http://localhost:8080/employee/addEmployee", {
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle,
        afm: data.afm,
        salary: data.salary,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      });

    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "32px", textAlign: "center" }}
        color="primary"
      >
        Add new Employee
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("firstName")}
          variant="outlined"
          margin="normal"
          label="First Name"
          helperText={errors.firstName?.message}
          error={!!errors.firstName?.message}
          fullWidth
          required
          style={{ marginBottom: "12px" }}
        />
        <TextField
          {...register("lastName")}
          variant="outlined"
          margin="normal"
          label="Last Name"
          helperText={errors.lastName?.message}
          error={!!errors.lastName?.message}
          fullWidth
          required
          style={{ marginBottom: "12px" }}
        />
        <TextField
          {...register("jobTitle")}
          variant="outlined"
          margin="normal"
          label="Job Title"
          helperText={errors.jobTitle?.message}
          error={!!errors.jobTitle?.message}
          fullWidth
          required
          style={{ marginBottom: "12px" }}
        />
        <TextField
          {...register("afm")}
          variant="outlined"
          margin="normal"
          label="TIN"
          helperText={errors.afm?.message}
          error={!!errors.afm?.message}
          fullWidth
          required
          style={{ marginBottom: "12px" }}
        />
        <TextField
          {...register("salary")}
          variant="outlined"
          margin="normal"
          label="Salary"
          helperText={errors.salary?.message}
          error={!!errors.salary?.message}
          fullWidth
          required
          style={{ marginBottom: "12px" }}
        />
        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          label="Password"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          type={showPassword ? "text" : "password"}
          fullWidth
          required
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
        <Box
          component="span"
          m={1}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          style={{ margin: "32px" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ height: 40 }}
            size="large"
            type="submit"
          >
            Submit
          </Button>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="secondary"
            sx={{
              height: 40,
              background: "red",
              ":hover": { bgcolor: "#d11a2a" },
            }}
            size="large"
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddEmployee;
