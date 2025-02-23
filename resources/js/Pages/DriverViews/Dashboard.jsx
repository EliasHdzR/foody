import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "@/theme.js";
import Layout from "@/Layouts/Layout.jsx";
import CustomTable2 from "@/Components/CustomTable2.jsx";
const Dashboard = ({activeOrder, ordersByRestaurant }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const ordersData = ordersByRestaurant.map(restaurant => {
        const { Nombre, Pedidos } = restaurant;
        return { Nombre, Pedidos };
    });

    return (
        <Box p="15px"
             height="100%"
             backgroundColor={colors.primary[400]}>

            <Box display="grid" gridTemplateColumns="repeat(16, 1fr)" gap="20px">
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                    height="300px"
                >

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
                    gridColumn="span 10"
                    backgroundColor="#FFFFFF"
                    borderRadius="8px"
                    p="20px"
                    marginTop="20px"
                    height="185px"
                    boxShadow={theme.shadows[1]}
                    bgcolor="background.default"
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
                        >
                            <Typography
                                variant="h6"
                                color={colors.greenAccent[500]}
                                fontWeight="bold"
                            >
                                Pedido en curso: #{activeOrder.number}
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Restaurante: <b>{activeOrder.restaurant.name}, {activeOrder.restaurant.address}, {activeOrder.restaurant.city}</b>
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Entregar en: <b>{activeOrder.customer.address}, {activeOrder.customer.suburb}</b>
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Cliente: <b>{activeOrder.customer.user.name}</b>
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Teléfono: <b>{ activeOrder.customer.user.phone ? activeOrder.customer.user.phone : "Sin teléfono" }</b>
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                Total: <b>${activeOrder.total_price}</b>
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
