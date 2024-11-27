import { Box, Typography } from "@mui/material";

const PlatillosList = ({ platillos }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      {platillos.map((platillo, index) => (
        <Box
          key={index}
          sx={{
            width: "100%", 
            backgroundColor: "rgba(220, 88, 109, 1)",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            color: "#fff",
          }}
        >
          <img
            src={platillo.image}
            alt={platillo.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <Typography variant="body1" fontWeight="bold">
            {platillo.name}
          </Typography>
          <Typography variant="body2" color="rgba(0, 0, 0, 1)">
            {platillo.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PlatillosList;
