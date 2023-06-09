import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import axios from "axios";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  ButtonGroup,
  Button,
} from "@mui/material";

interface User {
  id: Number;
  fullName: String;
  email: String;
  jobTitle: String;
  afm: String;
  salary: Number;
  password: String;
}

function Home() {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const employees = await axios.get("http://localhost:8080/employee/getAll");
    setUsers(employees.data);
  };

  const deleteEmployee = async (id: Number) => {
    await axios.delete(`http://localhost:8080/employee/${id}`);
    loadEmployees();
  };

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "auto", width: "80%", marginTop: "35px" }}
      sx={{ maxHeight: "300px" }}
    >
      <Table arial-aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>TIN</TableCell>
            <TableCell>Salary (in €)</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, userIndex) => (
            <TableRow
              key={userIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{String(user.id)}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.jobTitle}</TableCell>
              <TableCell>{user.afm}</TableCell>
              <TableCell>{String(user.salary)}</TableCell>
              <TableCell>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  size="small"
                >
                  <Button
                    component={RouterLink}
                    to={`/viewEmployee/${user.id}`}
                  >
                    View
                  </Button>
                  <Button
                    component={RouterLink}
                    to={`/editEmployee/${user.id}`}
                    sx={{
                      background: "white",
                      color: "primary.main",
                      ":hover": {
                        bgcolor: "primary.dark",
                        color: "white",
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    sx={{ background: "red", ":hover": { bgcolor: "#d11a2a" } }}
                    onClick={() => deleteEmployee(user.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;
