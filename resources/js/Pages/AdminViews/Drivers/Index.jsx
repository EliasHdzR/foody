import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "@/theme.js";
import Header from "@/Components/Header";
import { useTheme } from "@mui/material";
import Layout from "@/Layouts/Layout.jsx";
import { useState } from "react";
import Modal from "@/Pages/RestaurantViews/Modal";
import { Alert, AlertTitle } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
const Index = ({ drivers }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = (type, driver = null) => {
    setModalType(type);
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedDriver(null);
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const columns = [
    { field: "user_name", headerName: "Nombre", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone_number", headerName: "Teléfono", flex: 1 },
    { field: "shift_start", headerName: "Inicio de Turno", flex: 1 },
    { field: "shift_end", headerName: "Fin de Turno", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
<button
  onClick={() => openModal("delete", params.row)}
  className="px-8 py-2 bg-red-600 rounded rounded-lg font-medium text-sm hover:bg-red-700 transition"
>
  Eliminar
</button>

      ),
    },
  ];

  const rows = drivers.map((driver) => ({
    id: driver.id,
    user_name: driver.user_name,
    email: driver.email,
    phone_number: driver.phone_number,
    shift_start: driver.shift_start,
    shift_end: driver.shift_end,
  }));

  return (
    <Box m="20px">
      {successMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            <AlertTitle>Éxito</AlertTitle>
            {successMessage}
          </Alert>
        </div>
      )}
      <Header title="Repartidores" subtitle="Lista de repartidores registrados" />
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
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Eliminar Repartidor">
        {modalType === "delete" && (
          <DeleteDriverForm closeModal={closeModal} driver={selectedDriver} onSuccess={handleSuccess} />
        )}
      </Modal>
    </Box>
  );
};

const DeleteDriverForm = ({ closeModal, driver, onSuccess }) => {
  const { delete: destroy } = useForm();

  const submit = (e) => {
    e.preventDefault();
    destroy(route("admin.drivers.destroy", driver.id), {
      onSuccess: () => {
        closeModal();
        onSuccess(`Repartidor '${driver.user_name}' eliminado con éxito`);
      },
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Alert severity="warning">
        ¿Estás seguro de que deseas eliminar al usuario '{driver.user_name}'?
      </Alert>
      <div className="flex justify-end space-x-2">
        <PrimaryButton type="button" onClick={closeModal}>
          Cancelar
        </PrimaryButton>
        <PrimaryButton color="error" type="submit">
          Eliminar
        </PrimaryButton>
      </div>
    </form>
  );
};

Index.layout = (page) => <Layout children={page} type={"admin"} />;

export default Index;
