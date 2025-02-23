import { Box, Typography, useTheme } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { tokens } from "@/theme.js";
import Header from "@/Components/Header";
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

const Dashboard = ({productsCount, orderCounts, topSellingProducts}) => {
    console.log(orderCounts);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Box p="15px" height="100%" backgroundColor={colors.primary[400]}>

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
                {/* Resumen */}
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
                    <Box display="flex" justifyContent="space-around" height="90%" gap="15px">
                        <StatBox
                            title={productsCount}
                            subtitle="Productos en Menú"
                            icon={<RestaurantMenuIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={orderCounts.completed_orders}
                            subtitle="Pedidos Completados"
                            icon={<DoneIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
                        <StatBox
                            title={orderCounts.in_progress_orders}
                            subtitle="Pedidos en Curso"
                            icon={<HourglassBottomIcon sx={{ color: colors.blueAccent[600], fontSize: "30px" }} />}
                        />
                        <Box sx={{ height: "50%", width: "1px", backgroundColor:colors.grey[500], marginTop: "18px", opacity: "20%"}} />
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
                    height="300px"
                >
                    <TopSelling items={topSellingProducts} />
                </Box>
            </Box>
        </Box>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={"restaurant"} />;

export default Dashboard;

