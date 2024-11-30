import React, { useState, useContext } from "react";
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  LightModeOutlined as LightModeIcon,
  DarkModeOutlined as DarkModeIcon,
  NotificationsOutlined as NotificationsIcon,
  PersonOutlined as PersonIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../../theme";
import { Link } from "@inertiajs/react";

const Navbar = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
        borderBottom: `1px solid ${colors.grey[300]}`,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: colors.grey[800],
          borderRadius: "8px",
          padding: "0 8px",
        }}
      >
        <SearchIcon sx={{ color: colors.grey[300] }} />
        <InputBase
          placeholder="Buscar..."
          sx={{
            ml: 1,
            flex: 1,
            color: colors.grey[100],
          }}
        />
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon sx={{ color: colors.grey[300] }} />
          ) : (
            <LightModeIcon sx={{ color: colors.grey[700] }} />
          )}
        </IconButton>
        <IconButton>
          <NotificationsIcon sx={{ color: colors.grey[300] }} />
        </IconButton>

        <IconButton onClick={handleOpenMenu}>
          <PersonIcon sx={{ color: colors.grey[100] }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <MenuItem
            onClick={handleCloseMenu}
            sx={{
              "&:hover": {
                backgroundColor: colors.primary[300],
              },
            }}
          >
            <Link href={route("profile.edit")} style={{ textDecoration: "none", color: "inherit" }}>
              <Typography>Configuración</Typography>
            </Link>
          </MenuItem>
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: colors.primary[300],
              },
            }}
          >
            <Link
              href={route('logout')}
              method="post"
              as="button"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography>Log Out</Typography>
            </Link>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
