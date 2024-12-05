import {Box, Button} from "@mui/material";
import {DataGrid, GridToolbar, GridToolbarExport} from "@mui/x-data-grid";
import {tokens} from "@/theme.js";
import Header from "@/Components/Header";
import {useTheme} from "@mui/material";
import Layout from "@/Layouts/Layout.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Index = ({customers}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3},
        { field: "username", headerName: "Nombre", flex: 1},
        { field: "email", headerName: "Correo Electrónico", flex: 1,},
        { field: "phone", headerName: "Teléfono", flex: 1,},
        { field: "createdAt", headerName: "Fecha de Registro", flex: 1,},
        { field: "updatedAt", headerName: "Última Actualización", flex: 1, },
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
        const exportableColumns = columns.filter(col => col.field && col.field !== 'actions');
        const headers = exportableColumns.map(col => col.headerName).join(',');
        const rowsData = data.map(row =>
            exportableColumns.map(col => row[col.field]).join(',')
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
        const headers = columns.map(col => col.headerName);
        const data = rows.map(row => columns.map(col => row[col.field]));

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
        <Box m="20px">
            <Header title="Usuarios" subtitle="Lista de usuarios registrados"/>
            <Button onClick={downloadCSV} sx={{ mt: 2, mr: 2 }} variant="contained" color="primary">
                Descargar CSV
            </Button>
            <Button onClick={downloadPDF} sx={{ mt: 2 }} variant="contained" color="secondary">
                Descargar PDF
            </Button>
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
                    rows={rows}
                    columns={columns}
                    components={{Toolbar: GridToolbar}}
                />
            </Box>
        </Box>
    );
};

Index.layout = (page) => <Layout children={page} type={'admin'}/>;

export default Index;
