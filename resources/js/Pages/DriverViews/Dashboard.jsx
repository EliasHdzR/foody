import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "@/theme.js";
import Layout from "@/Layouts/Layout.jsx";
import CustomTable2 from "@/Components/CustomTable2.jsx";
import LineChart from "@/Components/LineChart.jsx";

const Dashboard = ({activeOrder, ordersByRestaurant, ordersByMonth }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const ordersData = ordersByRestaurant.map(restaurant => {
        const { Nombre, Ordenes } = restaurant;
        return { Nombre, Ordenes };
    });

    return (
        <Box m="10px 20px 20px 20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb="20px"
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.grey[100]}
                >
                    DASHBOARD DRIVERS
                </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
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
                        Restaurantes con Más Pedidos
                    </Typography>
                    {ordersByRestaurant.length > 0 ? (
                        <CustomTable2
                            data={ordersData}
                        />
                    ) : (
                        <Typography color={colors.grey[300]}>
                            No hay datos disponibles de restaurantes.
                        </Typography>
                    )}
                </Box>

                <Box
                    gridColumn="span 12"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                    height="135px"
                    width={"20%"}
                >
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="10px"
                    >
                        Estado de Pedido Activo
                    </Typography>
                    {activeOrder ? (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="start"
                            height="100%"
                        >
                            <Typography
                                variant="h6"
                                color={colors.greenAccent[500]}
                                fontWeight="bold"
                            >
                                Pedido en curso: #{activeOrder.number}
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Cliente: {activeOrder.customer.user.name}
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Total: ${activeOrder.total_price}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography color={colors.grey[300]}>
                            No hay pedidos activos en este momento.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={"driver"}/>;

export default Dashboard;
