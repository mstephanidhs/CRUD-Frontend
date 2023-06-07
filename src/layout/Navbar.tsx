import { Route, Link as RouterLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <AppShortcutIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={RouterLink}
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            boxShadow: "none",
            color: "white",
          }}
          to="/"
        >
          CRUD Project
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            component={RouterLink}
            to="/addEmployee"
            color="inherit"
            sx={{ fontWeight: "bold", letterSpacing: "1px" }}
          >
            Add Employee
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
