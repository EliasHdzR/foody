import {Alert, AlertTitle, Box, Button} from "@mui/material";
import {DataGrid, GridToolbar, GridToolbarExport} from "@mui/x-data-grid";
import {tokens} from "@/theme.js";
import Header from "@/Components/Header";
import {useTheme} from "@mui/material";
import Layout from "@/Layouts/Layout.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Tabla from "@/Components/Tabla.jsx";
import Modal from "@/Pages/RestaurantViews/Modal.jsx";
import React from "react";

const Index = ({customers}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { id: "id", label: "ID", style: { color: colors.grey[800]}},
        { id: "username", label: "Nombre", style: { color: colors.grey[800]}},
        { id: "email", label: "Correo Electrónico", style: { color: colors.grey[800]}},
        { id: "phone", label: "Teléfono", style: { color: colors.grey[800]}},
        { id: "createdAt", label: "Fecha de Registro", style: { color: colors.grey[800]}},
        { id: "updatedAt", label: "Última Actualización", style: { color: colors.grey[800]} },
    ];

    const rows = customers.map((customer) => {
        return {
            id: customer.id,
            username: customer.user_name,
            email: customer.email,
            phone: customer.phone,
            createdAt: customer.created_at,
            updatedAt: customer.updated_at,
        };
    });

    const convertToCSV = (data) => {
        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label).join(',');
        const rowsData = data.map(row =>
            exportableColumns.map(col => row[col.id]).join(',')
        ).join('\n');
        return `${headers}\n${rowsData}`;

    };

    const downloadCSV = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'clientes.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const headers = columns.map(col => col.label);
        const data = rows.map(row => columns.map(col => row[col.id]));

        doc.autoTable({
            head: [headers],
            body: data,
            styles: { cellPadding: 3, fontSize: 10 },
            startY: 10,
            theme: 'grid',
        });

        doc.save('usuarios.pdf');
    };

  return (
    <div>
      <div className="w-full min-h-screen py-10 px-4" style={{ backgroundColor: colors.primary[400] }}>
        <div className="w-full max-w-8xl mx-auto shadow-2xl rounded-lg p-10" style={{backgroundColor: "#FFFFFF", color: colors.grey[100]}}>
          <h2 className="text-2xl font-bold mb-5 text-left" style={{color: colors.grey[400]}}>
            Clientes
          </h2>
          <div className="flex mb-2">
            <button onClick={downloadCSV}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
              Descargar CSV
            </button>
            <button onClick={downloadPDF}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
              Descargar PDF
            </button>
          </div>
          <Tabla columns={columns} rows={rows} rowsPerPageCustom={10} />
        </div>
      </div>
    </div>
  );
};

Index.layout = (page) => <Layout children={page} type={'admin'}/>;

export default Index;
