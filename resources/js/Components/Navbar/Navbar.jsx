import React, { useContext } from "react";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import {
  LightModeOutlined as LightModeIcon,
  DarkModeOutlined as DarkModeIcon,
  NotificationsOutlined as NotificationsIcon,
  SettingsOutlined as SettingsIcon,
  PersonOutlined as PersonIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../../theme";

const Navbar = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

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
        <IconButton>
          <SettingsIcon sx={{ color: colors.grey[100] }} />
        </IconButton>
        <IconButton>
          <PersonIcon sx={{ color: colors.grey[100] }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
