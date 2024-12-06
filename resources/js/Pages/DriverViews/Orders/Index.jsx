import Layout from "@/Layouts/Layout.jsx";
import TablaColapsable from "@/Components/TablaColapsable.jsx";
import React, { useState } from "react";
import dayjs from 'dayjs';
import axios from 'axios';

const Index = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState(initialOrders);

    const columns = [
        { id: 'number', label: 'Número de Orden', align: 'left' },
        { id: 'status', label: 'Estado', align: 'left' },
        { id: 'date', label: 'Fecha', align: 'left' },
        { id: 'subtotal', label: 'SubTotal', align: 'left' },
        { id: 'shipping', label: 'Envío', align: 'left' },
        { id: 'taxes', label: 'IVA', align: 'left' },
        { id: 'discount', label: 'Descuento', align: 'left' },
        { id: 'total', label: 'Total', align: 'left' },
        { id: 'actions', label: 'Acciones', align: 'left' },
    ];

    const collapsableColumns = [
        { id: 'image', label: '', align: 'center' },
        { id: 'name', label: 'Nombre', align: 'left' },
        { id: 'quantity', label: 'Cantidad', align: 'right' },
        { id: 'individual_price', label: 'Precio Individual', align: 'right' },
        { id: 'sale_price', label: 'Precio de Venta', align: 'right' },
    ];

    const statusSetter = (status) => {
        if (status === 'pending') return 'Pendiente';
        if (status === 'accepted') return 'Aceptado';
        if (status === 'canceled_restaurant') return 'Cancelado por Restaurante';
        if (status === 'awaiting') return 'En espera';
        if (status === 'canceled_customer') return 'Cancelado por Cliente';
        if (status === 'canceled_driver') return 'Cancelado por Repartidor';
        if (status === 'on_way') return 'En camino';
        if (status === 'delivered') return 'Entregado';
    };

    const handleAcceptOrder = async (orderId) => {
        try {
            const response = await axios.post(`/repartidor/pedidos/${orderId}/accept`);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'on_way' } : order));
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleRejectOrder = async (orderId) => {
        try {
            const response = await axios.post(`/repartidor/pedidos/${orderId}/reject`);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'canceled_driver' } : order));
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    const handleDeliverOrder = async (orderId) => {
        try {
            const response = await axios.post(`/repartidor/pedidos/${orderId}/deliver`);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'delivered' } : order));
        } catch (error) {
            console.error('Error delivering order:', error);
        }
    };

    const rows = orders.map((order) => ({
        id: order.id,
        number: order.number,
        status: statusSetter(order.status),
        date: dayjs(order.updated_at).format('DD-MM-YYYY HH:mm:ss'),
        subtotal: `$${Number(order.subtotal).toFixed(2)}`,
        shipping: `$${Number(order.shipping_cost).toFixed(2)}`,
        taxes: `$${Number(order.taxes).toFixed(2)}`,
        discount: `$${Number(order.discount).toFixed(2)}`,
        total: `$${Number(order.total_price).toFixed(2)}`,
        actions: (
            <>
                {order.status === 'awaiting' && (
                    <>
                        <button onClick={() => handleAcceptOrder(order.id)} className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                            Aceptar pedido
                        </button>
                        <button onClick={() => handleRejectOrder(order.id)} className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                            Rechazar pedido
                        </button>
                    </>
                )}
                {order.status === 'on_way' && (
                    <button onClick={() => handleDeliverOrder(order.id)} className="ml-4 px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Entregar pedido
                    </button>
                )}
            </>
        ),
    }));

    const collapseRows = orders.reduce((acc, order) => {
        order.products.forEach((product) => {
            acc.push({
                parentId: order.id,
                id: product.id,
                image: <img src={`/storage/${product.image_url}`} className="w-20 h-20 object-cover" />,
                name: product.name,
                quantity: product.sold.quantity,
                individual_price: `$${Number(product.price).toFixed(2)}`,
                sale_price: `$${((Number(product.price)) * product.sold.quantity).toFixed(2)}`,
            });
        });
        return acc;
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Pedidos</h2>
            <TablaColapsable
                columns={columns}
                rows={rows}
                collapseColumns={collapsableColumns}
                collapseRows={collapseRows}
                subtitle="Productos"
            />
        </div>
    );
};

Index.layout = (page) => <Layout children={page} type={'driver'} />;
export default Index;