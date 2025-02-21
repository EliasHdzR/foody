import Layout from "@/Layouts/Layout.jsx";
import TablaColapsable from "@/Components/TablaColapsable.jsx";
import React, {useState} from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import BackButton from "@/Components/BackButton.jsx";
import dayjs from 'dayjs';

const Index = ({orders}) => {
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState(['','']);
    const [priceRange, setPriceRange] = useState(['','']);

    const handleStatusFilterChange = (e) => { setStatusFilter(e.target.value); };
    const handleDateRangeChange = (value, index) => {
        const updatedRange = [...dateRange];
        updatedRange[index] = value === '' ? '' : new Date(value).toISOString().split('T')[0];
        setDateRange(updatedRange);
    };
    const handlePriceRangeChange = (value, index) => {
        const updatedRange = [...priceRange];
        updatedRange[index] = value === '' ? '' : Number(value);
        setPriceRange(updatedRange);
    };
    const priceValidation = (price) => {
        const minPrice = priceRange[0] === '' ? null : Number(priceRange[0]);
        const maxPrice = priceRange[1] === '' ? null : Number(priceRange[1]);

        if (minPrice === null && maxPrice === null) return true;
        if (minPrice !== null && maxPrice === null) return price >= minPrice;
        if (minPrice === null && maxPrice !== null) return price <= maxPrice;
        return minPrice <= maxPrice && price >= minPrice && price <= maxPrice;
    }

    const resetFilters = () => {
        setStatusFilter('');
        setDateRange(['','']);
        setPriceRange(['','']);
    };

    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.updated_at);
        const startDate = dateRange[0] ? new Date(dateRange[0]) : null;
        const endDate = dateRange[1] ? new Date(dateRange[1]) : null;

        const matchesStatus = order.status.toLowerCase().includes(statusFilter.toLowerCase());
        const matchesDate = (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
        const matchesPrice = priceValidation(order.total_price);

        return matchesStatus && matchesDate && matchesPrice;
    });

    const columns = [
        {id: 'number', label: 'Número de Orden', align: 'left'},
        {id: 'status', label: 'Estado', align: 'left'},
        {id: 'date', label: 'Fecha', align: 'left'},
        {id: 'subtotal', label: 'SubTotal', align: 'left'},
        {id: 'shipping', label: 'Envío', align: 'left'},
        {id: 'taxes', label: 'IVA', align: 'left'},
        {id: 'discount', label: 'Descuento', align: 'left'},
        {id: 'total', label: 'Total', align: 'left'},
    ];

    const collapsableColumns = [
        {id: 'image', label: '', align: 'center'},
        {id: 'name', label: 'Nombre', align: 'left'},
        {id: 'quantity', label: 'Cantidad', align: 'right'},
        {id: 'individual_price', label: 'Precio Individual', align: 'right'},
        {id: 'sale_price', label: 'Precio de Venta', align: 'right'},
    ];

    const statusSetter = (status) => {
        if(status === 'pending') return 'Pendiente';
        if(status === 'accepted') return 'Aceptado';
        if(status === 'canceled_restaurant') return 'Cancelado por Restaurante';
        if(status === 'awaiting') return 'En espera';
        if(status === 'canceled_customer') return 'Cancelado por Cliente';
        if(status === 'canceled_driver') return 'Cancelado por Repartidor';
        if(status === 'on_way') return 'En camino';
        if(status === 'delivered') return 'Entregado';
    }

    const rows = filteredOrders.map((order) => ({
        id: order.id,
        number: order.number,
        status: statusSetter(order.status),
        date: dayjs(order.updated_at).format('DD-MM-YYYY HH:mm:ss'),
        subtotal: `$${Number(order.subtotal).toFixed(2)}`,
        shipping: `$${Number(order.shipping_cost).toFixed(2)}`,
        taxes: `$${Number(order.taxes).toFixed(2)}`,
        discount: `$${Number(order.discount).toFixed(2)}`,
        total: `$${Number(order.total_price).toFixed(2)}`,
    }));

    const collapseRows = filteredOrders.reduce((acc, order) => {
        order.products.forEach((product) => {
            acc.push({
                parentId: order.id,
                id: product.id,
                image: <img src={`/storage/${product.image_url}`} className="w-20 h-20 object-cover"/>,
                name: product.name,
                quantity: product.sold.quantity,
                individual_price: `$${Number(product.price).toFixed(2)}`,
                sale_price: `$${((Number(product.price)) * product.sold.quantity).toFixed(2)}`,
            });
        });
        return acc;
    }, []);

    const convertToCSV = (data) => {
        const exportableColumns = columns.filter(col => col.id);
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
        a.setAttribute('download', 'pedidos.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        const exportableColumns = columns.filter(col => col.id);
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

        doc.save('pedidos.pdf');
    };

    return (
        <div className="w-full bg-gray-100 min-h-full py-10 px-4">
            <div className="w-full max-w-8xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <BackButton to={ route("admin.restaurant.index") } />
                <h2 className="text-3xl font-extrabold mt-5 mb-5">Pedidos</h2>
                <div className="flex justify-start mb-2">
                    <select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        className="mr-2 p-2 border rounded"
                    >
                        <option value="">Todos</option>
                        <option value="pending">Pendiente</option>
                        <option value="accepted">Aceptado</option>
                        <option value="awaiting">En espera</option>
                        <option value="canceled_customer">Cancelado por Cliente</option>
                        <option value="canceled_driver">Cancelado por Repartidor</option>
                        <option value="canceled_restaurant">Cancelado por Restaurante</option>
                        <option value="on_way">En camino</option>
                        <option value="delivered">Entregado</option>
                    </select>
                    <input
                        type="date"
                        value={dateRange[0]}
                        onChange={(e) => handleDateRangeChange(e.target.value, 0)}
                        className="mr-2 p-2 w-[10rem] border rounded"
                    />
                    <input
                        type="date"
                        value={dateRange[1]}
                        onChange={(e) => handleDateRangeChange(e.target.value, 1)}
                        className="mr-2 p-2 w-[10rem] border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                        className="mr-2 p-2 w-[10rem] border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Precio máximo"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                        className="mr-2 p-2 w-[10rem] border rounded"
                    />
                    <button onClick={resetFilters}
                            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition">
                        Reiniciar
                    </button>
                    <button onClick={downloadCSV}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                        Descargar CSV
                    </button>
                    <button onClick={downloadPDF}
                            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                        Descargar PDF
                    </button>
                </div>

                <TablaColapsable
                    columns={columns}
                    rows={rows}
                    collapseColumns={collapsableColumns}
                    collapseRows={collapseRows}
                    subtitle="Productos"
                />
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={'admin'}/>;
export default Index;
