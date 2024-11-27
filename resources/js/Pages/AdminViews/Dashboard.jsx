import { Box, Button, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Header from "@/Components/Header";
import LineChart from "@/Components/LineChart";
import BarChart from "@/Components/BarChart";
import { tokens } from "@/theme.js";
import CustomTable from "@/Components/CustomTable";
import TopSelling from "@/Components/TopSelling";
import Layout from "@/Layouts/Layout"; 

const StatBox = ({ title, subtitle, icon }) => {
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

const Dashboard = () => {
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
                <Header title="DASHBOARD" subtitle="Bienvenido a tu dashboard" />
                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Reports
                </Button>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
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
                        mb="5x"
                    >
                        Resumen
                    </Typography>
                    <Box display="flex" justifyContent="space-around">
                        <StatBox
                            title="150"
                            subtitle="Productos"
                            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title="20,000"
                            subtitle="Usuarios"
                            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title="100"
                            subtitle="Repartidores"
                            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title="15"
                            subtitle="Restaurantes"
                            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="22px"
                    height="150px"
                >
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color={colors.grey[100]}
                        mb="5px"
                    >
                        Restaurantes
                    </Typography>
                    <Box display="flex" justifyContent="space-around" height="70%" gap="15px">
                        <StatBox
                            title="868"
                            subtitle="En línea"
                            icon={<AccessTimeIcon sx={{ color: colors.greenAccent[600], fontSize: "30px" }} />}
                        />
                        <StatBox
                            title="200"
                            subtitle="Fuera de servicio"
                            icon={<DirectionsRunIcon sx={{ color: colors.redAccent[600], fontSize: "30px" }} />}
                        />
                    </Box>
                </Box>

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
                        Pedidos
                    </Typography>
                    <LineChart isDashboard={true} />
                </Box>
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
                        Pedidos por repartidor
                    </Typography>
                    <BarChart isDashboard={true} />
                </Box>
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                    height="300px"
                >
                    <CustomTable />
                </Box>
                <Box
                    gridColumn="span 6"
                    backgroundColor={colors.primary[400]}
                    borderRadius="8px"
                    p="20px"
                    height="300px"
                >
                    <TopSelling />
                </Box>
            </Box>
        </Box>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={'admin'}/>;

export default Dashboard;
