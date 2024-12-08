import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import Tabla from "@/Components/Tabla.jsx";
import BackButton from "@/Components/BackButton.jsx";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const CategoriesIndex = ({categories}) => {

    const columns = [
        {id: 'name', label: 'Nombre'},
        {id: 'created_at', label: 'Fecha de Creación'},
        {id: 'updated_at', label: 'Última Actualización'},
    ];

    const rows = categories.map((category) => ({
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at,
    }));

    const convertToCSV = (data) => {
        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label).join(',');
        const rows = data.map(row =>
            exportableColumns.map(col => {
                return row[col.id];
            }).join(',')
        ).join('\n');
        return `${headers}\n${rows}`;
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'categorias.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label);

        const cleanText = (text) =>
            typeof text === 'string' ? text.replace(/[\r\n]+/g, ' ').trim() : text;

        const data = rows.map(row =>
            exportableColumns.map(col => cleanText(row[col.id]))
        );

        doc.autoTable({
            head: [headers],
            body: data,
            styles: { cellPadding: 3, fontSize: 10 },
            startY: 10,
            theme: 'grid',
        });

        doc.save('categorias.pdf');
    };

    return (
        <div className={"w-full bg-gray-100 min-h-full py-10 px-4"}>
            <div className="w-full max-w-8xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <BackButton to={route("admin.restaurant.index")}/>
                <h2 className="text-4xl font-extrabold  mb-10 text-center">Categorías</h2>

                <div className="flex justify-end mb-2">
                    <button onClick={downloadCSV}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                        Descargar CSV
                    </button>
                    <button onClick={downloadPDF}
                            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                        Descargar PDF
                    </button>
                </div>

                <Tabla
                    columns={columns}
                    rows={rows}
                    rowsPerPageCustom={10}
                />
            </div>
        </div>
    );
}

CategoriesIndex.layout = (page) => <Layout children={page} type={'admin'}/>;

export default CategoriesIndex;
