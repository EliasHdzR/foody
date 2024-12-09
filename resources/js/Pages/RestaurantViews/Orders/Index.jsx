import Layout from "@/Layouts/Layout.jsx";
import TablaColapsable from "@/Components/TablaColapsable.jsx";
import React, { useState } from "react";
import dayjs from 'dayjs';
import axios from 'axios';
import Header from "@/Components/Header";

const Index = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState(initialOrders);

    const columns = [
        { id: 'number', label: 'Número de Orden', align: 'left' },
        { id: 'driver', label: 'Repartidor', align: 'left' },
        { id: 'customer', label: 'Cliente', align: 'left' },
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
            const response = await axios.post(`/restaurante/ordenes/${orderId}/accept`);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'accepted' } : order));
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.post(`/restaurante/ordenes/${orderId}/cancel`);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'canceled_restaurant' } : order));
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const handleAwaitingOrder = async (orderId) => {
        try {
            const response = await axios.post(`/restaurante/ordenes/${orderId}/awaiting`);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'awaiting' } : order));
        } catch (error) {
            console.error('Error setting order to awaiting:', error);
        }
    };

    const rows = orders.map((order) => ({
        id: order.id,
        number: order.number,
        driver: order.driver.user.name,
        customer: order.customer.user.name,
        status: statusSetter(order.status),
        date: dayjs(order.updated_at).format('DD-MM-YYYY HH:mm:ss'),
        subtotal: `$${Number(order.subtotal).toFixed(2)}`,
        shipping: `$${Number(order.shipping_cost).toFixed(2)}`,
        taxes: `$${Number(order.taxes).toFixed(2)}`,
        discount: `$${Number(order.discount).toFixed(2)}`,
        total: `$${Number(order.total_price).toFixed(2)}`,
        actions: (
            <>
                {order.status === 'pending' && (
                    <>
                        <button onClick={() => handleAcceptOrder(order.id)} className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                            Aceptar pedido
                        </button>
                        <button onClick={() => handleCancelOrder(order.id)} className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                            Cancelar pedido
                        </button>
                    </>
                )}
                {order.status === 'accepted' && (
                    <button onClick={() => handleAwaitingOrder(order.id)} className="ml-4 px-4 py-2 bg-yellow-600 rounded-lg font-semibold hover:bg-yellow-700 transition">
                        Esperar repartidor
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
        <div className="container p-6 mx-auto">
                <Header title="Pedidos"></Header>
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

Index.layout = (page) => <Layout children={page} type={'restaurant'} />;
export default Index;