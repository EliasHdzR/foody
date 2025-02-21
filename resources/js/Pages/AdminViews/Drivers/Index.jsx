import {Box} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "@/theme.js";
import Header from "@/Components/Header";
import {useTheme} from "@mui/material";
import Layout from "@/Layouts/Layout.jsx";
import {useState} from "react";
import Modal from "@/Pages/RestaurantViews/Modal";
import {Alert, AlertTitle} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm} from "@inertiajs/react";
import Tabla from "@/Components/Tabla.jsx";

const Index = ({drivers}) => {
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
    {id: "user_name", label: "Nombre"},
    {id: "email", label: "Email"},
    {id: "phone_number", label: "Teléfono"},
    {id: "shift_start", label: "Inicio de Turno"},
    {id: "shift_end", label: "Fin de Turno"},
    {id: "actions", label: "Acciones", align: "center", style: {color: colors.grey[800]}},
  ];

  const rows = drivers.map((driver) => ({
    id: driver.id,
    user_name: driver.user_name,
    email: driver.email,
    phone_number: driver.phone_number,
    shift_start: driver.shift_start,
    shift_end: driver.shift_end,
    actions: [
      <button
        onClick={() => openModal("delete", driver)}
        className="px-8 py-2 bg-red-600 rounded font-medium text-sm hover:bg-red-700 transition"
      >
        Eliminar
      </button>
    ],
  }));

  return (
    <div>
      {successMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            <AlertTitle style={{color: colors.primary[700]}}>Éxito</AlertTitle>
            <span style={{color: colors.grey[700]}}>{successMessage}</span>
          </Alert>
        </div>
      )}

      <div
        className="w-full min-h-screen py-10 px-4"
        style={{backgroundColor: colors.primary[400]}}
      >
        <div
          className="w-full max-w-8xl mx-auto shadow-2xl rounded-lg p-10"
          style={{backgroundColor: "#FFFFFF", color: colors.grey[100]}}
        >
          <h2
            className="text-2xl font-bold mb-5 text-left"
            style={{color: colors.grey[400]}}
          >
            Repartidores
          </h2>

          <Tabla
            columns={columns}
            rows={rows}
            rowsPerPageCustom={10}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Eliminar Repartidor">
        {modalType === "delete" && (
          <DeleteDriverForm closeModal={closeModal} driver={selectedDriver} onSuccess={handleSuccess}/>
        )}
      </Modal>
    </div>
  );
};

const DeleteDriverForm = ({closeModal, driver, onSuccess}) => {
  const {delete: destroy} = useForm();

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

Index.layout = (page) => <Layout children={page} type={"admin"}/>;

export default Index;
