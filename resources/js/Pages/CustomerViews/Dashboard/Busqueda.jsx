import { Box, InputBase, useTheme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { tokens } from "@/theme";

const Busqueda = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.primary[400],
        borderRadius: "8px",
        padding: "10px 20px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      <SearchIcon sx={{ color: colors.grey[300], marginRight: "10px" }} />
      <InputBase
        placeholder="Busca comidas, bebidas, restaurantes..."
        fullWidth
        sx={{
          color: colors.grey[100],
          fontSize: "14px",
        }}
      />
    </Box>
  );
};

export default Busqueda;
