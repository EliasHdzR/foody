import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "@/theme.js";
import { mockDataUsers } from "@/data/mockData";
import Header from "@/Components/Header";
import { useTheme } from "@mui/material";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.8,
      cellClassName: "role-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      type: "boolean",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueGetter: (params) => new Date(params.row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Usuarios" subtitle="Lista de usuarios registrados" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .role-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataUsers}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Index;
