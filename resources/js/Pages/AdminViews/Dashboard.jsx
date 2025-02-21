import {Box, Typography, useTheme} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CategoryIcon from '@mui/icons-material/Category';

import LineChart from "@/Components/LineChart";
import {tokens} from "@/theme.js";
import CustomTable from "@/Components/CustomTable";
import TopSelling from "@/Components/TopSelling";
import Layout from "@/Layouts/Layout";

const StatBox = ({title, subtitle, icon}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p="10px"
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

const Dashboard = ({counters, orders, restaurants, products}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const lineData = orders.reduce((acc, order) => {
        const category = acc.find(item => item.id === order.category_name);
        if (category) {
            category.data.push({x: order.month, y: order.order_count});
        } else {
            acc.push({
                id: order.category_name,
                color: colors.greenAccent[500],
                data: [{x: order.month, y: order.order_count}]
            });
        }
        return acc;
    }, []);

    const restaurantData = restaurants.map(restaurant => {
        const {name, orders, inProgress, total} = restaurant;
        return {name, orders, inProgress, total};
    });

    const items = products.map(product => {
        const {name, store, image_url} = product;
        return {name, store, image_url};
    });

    return (
        <Box p="15px"
             height="100%"
             backgroundColor={colors.primary[400]}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
                <Box
                    gridColumn="span 8"
                    backgroundColor="#FFFFFF"
                    borderRadius="8px"
                    p="20px"
                    height="150px"
                    sx={{boxShadow: theme.shadows[1]}}
                >
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="5px"
                    >
                        Resumen
                    </Typography>
                    <Box display="flex" justifyContent="space-around" height="90%">
                        <StatBox
                            title={counters.products}
                            subtitle="Productos"
                            icon={<InventoryIcon sx={{color: colors.greenAccent[400], fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.customers}
                            subtitle="Usuarios"
                            icon={<PeopleIcon sx={{color: colors.blueAccent[400], fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.drivers}
                            subtitle="Repartidores"
                            icon={<DeliveryDiningIcon sx={{color: colors.blueAccent[1000], fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.restaurants}
                            subtitle="Restaurantes"
                            icon={<RestaurantIcon sx={{color: "#c6c643", fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.restaurants}
                            subtitle="Categorías"
                            icon={<CategoryIcon sx={{color: colors.greenAccent[600], fontSize: "30px"}}/>}
                        />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    backgroundColor="#FFFFFF"
                    borderRadius="8px"
                    p="22px"
                    height="150px"
                    sx={{boxShadow: theme.shadows[1]}}
                >
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="5px"
                    >
                        Ordenes
                    </Typography>
                    <Box display="flex" justifyContent="space-around" height="90%" gap="15px">
                        <StatBox
                            title={counters.orders.completed_orders}
                            subtitle="Realizados"
                            icon={<DoneIcon sx={{color: colors.greenAccent[600], fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.orders.in_progress_orders}
                            subtitle="En Curso"
                            icon={<HourglassBottomIcon sx={{color: colors.blueAccent[600], fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.orders.canceled_orders}
                            subtitle="Cancelados"
                            icon={<CancelIcon sx={{color: colors.redAccent[600], fontSize: "30px"}}/>}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={counters.orders.total_orders}
                            subtitle="Total"
                            icon={<FactCheckIcon sx={{color: colors.greenAccent[600], fontSize: "30px"}}/>}
                        />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 6"
                    backgroundColor="#FFFFFF"
                    borderRadius="8px"
                    p="20px"
                    height="300px"
                    sx={{boxShadow: theme.shadows[1]}}
                >
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="10px"
                    >
                        Pedidos por Categoría
                    </Typography>
                    <LineChart isDashboard={true} data={lineData}/>
                </Box>
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                >
                    <CustomTable restaurantData={restaurantData}/>
                </Box>
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    height="300px"
                >
                    <TopSelling items={items}/>
                </Box>
            </Box>
        </Box>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={'admin'}/>;

export default Dashboard;
