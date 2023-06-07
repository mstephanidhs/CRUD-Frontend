import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import axios from "axios";

import { Paper, Chip, TextField, Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface User {
  firstName: String;
  lastName: String;
  jobTitle: String;
  afm: String;
  salary: Number;
  password: String;
}

const ViewEmployee = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    afm: "",
    salary: 0,
    password: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const employee = await axios.get(`http://localhost:8080/employee/${id}`);
    setUser(employee.data);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "400px",
        margin: "0 auto",
        marginTop: "50px",
      }}
    >
      <Paper elevation={3} style={{ padding: "30px" }}>
        <Chip
          label="Employee Details"
          color="primary"
          variant="outlined"
          icon={<AccountBoxIcon />}
          size="medium"
          style={{ margin: "20px 0", fontWeight: 600, letterSpacing: "0.75px" }}
        />

        <br />
        <p>
          <TextField
            color="primary"
            variant="outlined"
            InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            label="First Name"
            style={{ marginBottom: "10px" }}
            value={user.firstName}
          />
        </p>
        <p>
          <TextField
            color="primary"
            variant="outlined"
            InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            label="Last Name"
            style={{ marginBottom: "10px" }}
            value={user.lastName}
          />
        </p>
        <p>
          <TextField
            color="primary"
            variant="outlined"
            InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            label="Job Title"
            style={{ marginBottom: "10px" }}
            value={user.jobTitle}
          />
        </p>
        <p>
          <TextField
            color="primary"
            variant="outlined"
            InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            label="TIN"
            style={{ marginBottom: "10px" }}
            value={user.afm}
          />
        </p>
        <p>
          <TextField
            color="primary"
            variant="outlined"
            InputProps={{ readOnly: true }}
            fullWidth
            size="small"
            label="Salary"
            style={{ marginBottom: "10px" }}
            value={user.salary}
          />
        </p>
        <Button variant="contained" component={RouterLink} to="/">
          Back to Home
        </Button>
      </Paper>
    </div>
  );
};

export default ViewEmployee;
