    import React, { useState } from "react";
    import { Box, InputBase, useTheme } from "@mui/material";
    import { Search as SearchIcon } from "@mui/icons-material";
    import { tokens } from "@/theme";

    const Busqueda = ({ onSearch }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

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
            value={searchTerm}
            onChange={handleSearch}
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
