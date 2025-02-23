import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "@inertiajs/react";

const CustomTable = ({ data }) => {
    const theme = useTheme();

    // Obtener los nombres de las columnas de la primera fila de datos
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <Box
            gridColumn="span 6"
            bgcolor="background.default"
            borderRadius="8px"
            p="20px"
            sx={{ boxShadow: theme.shadows[1] }}
        >
            {/* Encabezado */}
            <Box display="flex" justifyContent="space-between" mb="10px">
                <Typography
                    variant="h6"
                    fontWeight="600"
                    color="text.primary"
                >
                    Pedidos Completados por Restaurante
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: theme.palette.secondary.main,
                    }}
                >
                </Typography>
            </Box>

            {/* Tabla */}
            <Box>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                style={{
                                    textAlign: "left",
                                    color: theme.palette.text.secondary,
                                    padding: "8px",
                                }}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            style={{
                                backgroundColor:
                                    rowIndex % 2 === 0
                                        ? theme.palette.background.paper
                                        : theme.palette.action.hover,
                            }}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{
                                        padding: "8px",
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Box>
        </Box>
    );
};

export default CustomTable;
