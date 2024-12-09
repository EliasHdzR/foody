import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme.js";
import Layout from "@/Layouts/Layout.jsx";
import LineChart from "@/Components/LineChart";
import CustomTable from "@/Components/CustomTable";

const monthlyOrders = [
    { month: "Enero", orders: 45 },
    { month: "Febrero", orders: 30 },
    { month: "Marzo", orders: 60 },
  ];
  
  const topRestaurants = [
    { restaurantName: "Pizza Planet", orders: 120 },
    { restaurantName: "Sushi House", orders: 90 },
  ];
  
  const activeOrder = {
    id: 12345,
    customerName: "Juan Pérez",
    total: 350.50,
  };
  
const Dashboard = ({
  monthlyOrders = [], 
  topRestaurants = [],
  activeOrder = null, 
}) => {
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
            Pedidos por Mes
          </Typography>
          <LineChart isDashboard={true} data={monthlyOrders} />
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
            Restaurantes con Más Pedidos
          </Typography>
          {topRestaurants.length > 0 ? (
            <CustomTable
              rows={topRestaurants}
              columns={[
                { id: "restaurantName", label: "Nombre del Restaurante", align: "left" },
                { id: "orders", label: "Pedidos Totales", align: "right" },
              ]}
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
          height="150px"
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
              alignItems="center"
              height="100%"
            >
              <Typography
                variant="h6"
                color={colors.greenAccent[500]}
                fontWeight="bold"
              >
                Pedido en curso: #{activeOrder.id}
              </Typography>
              <Typography color={colors.grey[100]}>
                Cliente: {activeOrder.customerName}
              </Typography>
              <Typography color={colors.grey[100]}>
                Total: ${activeOrder.total}
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

Dashboard.layout = (page) => <Layout children={page} type={"driver"} />;

export default Dashboard;
