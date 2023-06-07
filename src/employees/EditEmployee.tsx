import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink, useParams } from "react-router-dom";

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
  firstName: yup.string(),
  lastName: yup.string(),
  jobTitle: yup.string(),
  afm: yup.string(),
  salary: yup.number(),
  password: yup.string().min(8).max(120),
});

function EditEmployee() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    afm: "",
    salary: 0,
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });

  useEffect(() => {
    getEmployee();
  }, []);

  const handleVisibilityPassword = (): void => {
    setShowPassword((prevPasswordState) => !prevPasswordState);
  };

  const getEmployee = async () => {
    const employee = await axios.get(`http://localhost:8080/employee/${id}`);
    setUser(employee.data);
  };

  const onInputChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUser({ ...user, [target.name]: target.value });
  };

  const onSubmit = async (data: User) => {
    await axios
      .put(`http://localhost:8080/employee/${id}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: user.jobTitle,
        afm: user.afm,
        salary: user.salary,
        password: user.password,
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
        Edit Employee
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
          value={user.firstName}
          onChange={onInputChange}
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
          value={user.lastName}
          onChange={onInputChange}
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
          value={user.jobTitle}
          onChange={onInputChange}
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
          value={user.afm}
          onChange={onInputChange}
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
          value={user.salary}
          onChange={onInputChange}
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
          value={user.password}
          onChange={onInputChange}
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

export default EditEmployee;
