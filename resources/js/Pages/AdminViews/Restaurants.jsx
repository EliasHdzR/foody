import Tienda from '../../Components/Tienda.jsx';
import '../../../css/app.css';
import Layout from '@/Layouts/Layout.jsx';
import { Link } from "@inertiajs/react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme";

export default function Restaurants({ restaurants }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            sx={{
                padding: "20px",
                backgroundColor: colors.primary[400],
                color: colors.grey[100],
                borderRadius: "8px",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: colors.greenAccent[500], 
                    marginBottom: "16px",
                    fontWeight: "bold",
                }}
            >
                Tiendas
            </Typography>

            <Link
                href={route('admin.categories.index')}
                style={{
                    color: colors.blueAccent[300], 
                    textDecoration: "underline",
                }}
            >
                Ver Categorías
            </Link>

            <Box
                sx={{
                    backgroundColor: colors.primary[500], 
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", 
                    marginTop: "20px",
                }}
            >
                <Box display="flex" justifyContent="end" marginBottom="16px">
                    <Button
                        sx={{
                            backgroundColor: colors.greenAccent[500], 
                            color: colors.grey[100],
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: colors.greenAccent[400],
                            },
                        }}
                    >
                        Añadir
                    </Button>
                </Box>

                {restaurants && restaurants.length > 0 ? (
                    restaurants.map((restaurant, index) => (
                        <Tienda
                            key={index}
                            logo={restaurant.logo}
                            nombre={restaurant.nombre}
                            branch={restaurant.branch}
                            direccion={restaurant.direccion}
                            telefono={restaurant.telefono}
                            rutaInventario={`restaurantes/${restaurant.id}/productos`}
                            rutaEdicion={() => console.log(`Tocaste ${restaurant.nombre}`)}
                        />
                    ))
                ) : (
                    <Typography
                        variant="body2"
                        sx={{ color: colors.blueAccent[300], textAlign: "center" }}
                    >
                        No hay restaurantes disponibles.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

Restaurants.layout = (page) => <Layout children={page} type={'admin'} />;
