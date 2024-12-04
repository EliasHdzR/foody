import { useState } from "react";
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";


const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(31, 29, 43, 1)",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography
          variant="body1"
          sx={{
            color: "",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          sx={{
            color: "#FFFFFF",
          }}
        >
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            color: "#fff",
            maxHeight: "350px",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default AccordionSection;
