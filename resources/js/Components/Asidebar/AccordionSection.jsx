import { useState } from "react";
import { Box, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";



const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(45, 43, 56, 1)",
        borderRadius: "3px",
        border: "1px solid rgba(0,0,0,1)",
        padding: "10px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
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
            color: "rgba(234, 124, 105, 1)",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          sx={{
            color: "rgba(234, 124, 105, 1)",
          }}
        >
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            marginTop: "10px",
            paddingLeft: "10px",
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
