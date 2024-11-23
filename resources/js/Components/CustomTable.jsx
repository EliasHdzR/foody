import { Box, Typography, useTheme } from "@mui/material";

const restaurantData = [
  { name: "Rosita", orders: 30, inProgress: 12, total: "₹100" },
  { name: "Pastelería Juan", orders: 21, inProgress: 15, total: "₹207" },
  { name: "Carl's Jr", orders: 19, inProgress: 17, total: "₹105" },
];

const CustomTable = () => {
  const theme = useTheme();

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
          Restaurantes con más pedidos
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            cursor: "pointer",
            color: theme.palette.secondary.main,
          }}
        >
          Ver todos
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
              <th
                style={{
                  textAlign: "left",
                  color: theme.palette.text.secondary,
                  padding: "8px",
                }}
              >
                Nombre
              </th>
              <th
                style={{
                  textAlign: "left",
                  color: theme.palette.text.secondary,
                  padding: "8px",
                }}
              >
                Pedidos
              </th>
              <th
                style={{
                  textAlign: "left",
                  color: theme.palette.text.secondary,
                  padding: "8px",
                }}
              >
                En progreso
              </th>
              <th
                style={{
                  textAlign: "left",
                  color: theme.palette.text.secondary,
                  padding: "8px",
                }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurantData.map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.background.paper
                      : theme.palette.action.hover,
                }}
              >
                <td
                  style={{
                    padding: "8px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {row.name}
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {row.orders}
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {row.inProgress}
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default CustomTable;
