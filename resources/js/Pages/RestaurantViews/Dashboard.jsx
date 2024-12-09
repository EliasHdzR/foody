import { Box, Button, Typography, useTheme } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DoneIcon from "@mui/icons-material/Done";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { tokens } from "@/theme.js";
import Header from "@/Components/Header";
import CustomTable from "@/Components/CustomTable";
import TopSelling from "@/Components/TopSelling";
import LineChart from "@/Components/LineChart";
import Layout from "@/Layouts/Layout";

const StatBox = ({ title = "0", subtitle = "", icon }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
            p="10px"
            sx={{
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            {icon && <Box mb="10px">{icon}</Box>}
            <Typography variant="h6" fontWeight="bold" align="center">
                {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">
                {subtitle}
            </Typography>
        </Box>
    );
};

const Dashboard = ({productsCount, orderCounts, topSellingProducts}) => {
    console.log(orderCounts);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="10px 20px 20px 20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb="20px"
            >
                <Header title="DASHBOARD" subtitle="Gestión de tu restaurante" />
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
                {/* Resumen */}
                <Box
                    gridColumn="span 8"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                    height="150px"
                >
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="5px"
                    >
                        Resumen
                    </Typography>
                    <Box display="flex" justifyContent="space-around" height="90%" gap="15px">
                        <StatBox
                            title={productsCount}
                            subtitle="Productos en Menú"
                            icon={<RestaurantMenuIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title={orderCounts.completed_orders}
                            subtitle="Pedidos Completados"
                            icon={<DoneIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title={orderCounts.in_progress_orders}
                            subtitle="Pedidos en Curso"
                            icon={<HourglassBottomIcon sx={{ color: colors.blueAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title={orderCounts.canceled_orders}
                            subtitle="Pedidos Cancelados"
                            icon={<CancelIcon sx={{ color: colors.redAccent[600], fontSize: "30px" }} />}
                        />
                    </Box>
                </Box>

                {/* Productos Más Vendidos */}
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                    height="300px"
                >
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="10px"
                    >
                        Productos Más Vendidos
                    </Typography>
                    <TopSelling items={topSellingProducts} />
                </Box>
            </Box>
        </Box>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={"restaurant"} />;

export default Dashboard;

