import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "@inertiajs/react"; 
import { tokens } from "@/theme"; 

const CompactItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSelected = selected === title;

  return (
    <Link
      href={to}
      onClick={() => setSelected(title)}
      style={{
        textDecoration: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          margin: "10px 0",
          borderRadius: "12px",
          backgroundColor: isSelected
            ? "rgba(234, 124, 105, 1)" 
            : "rgba(31, 29, 43, 1)", 
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(234, 124, 105, 0.8)",
          },
        }}
      >
        <IconButton
          sx={{
            color: isSelected ? "#FFFFFF" : "rgba(234, 124, 105, 1)", 
            fontSize: "24px",
          }}
        >
          {icon}
        </IconButton>
      </Box>
    </Link>
  );
};

export default CompactItem;
