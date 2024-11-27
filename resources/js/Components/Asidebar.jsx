import { Box, Typography } from "@mui/material";

const Asidebar = ({ title, children, sx }) => {
  return (
    <Box
      sx={{
        width: "100%", 
        height: "100vh", 
        backgroundColor: "rgba(31, 29, 43, 1)", 
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", 
        borderRadius: "0px", 
        overflowY: "auto", 
        ...sx, 
      }}
    >
      {title && (
        <Typography
          variant="h4"
          sx={{
            color: "rgba(234, 124, 105, 1)", 
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          flexGrow: 1, 
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Asidebar;
