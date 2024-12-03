import Layout from "@/Layouts/Layout.jsx";
import TablaColapsable from "@/Components/TablaColapsable.jsx";
import React from "react";

const Index = ({orders}) => {
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

    const rows = orders.map((order) => ({
        id: order.id,
        number: order.number,
        status: order.status,
        date: order.updated_at,
        subtotal: `$${Number(order.subtotal).toFixed(2)}`,
        shipping: `$${Number(order.shipping_cost).toFixed(2)}`,
        taxes: `$${Number(order.taxes).toFixed(2)}`,
        discount: `$${Number(order.discount).toFixed(2)}`,
        total: `$${Number(order.total_price).toFixed(2)}`,
    }));

    const collapseRows = orders.reduce((acc, order) => {
        order.products.forEach((product) => {
            acc.push({
                parentId: order.id,
                id: product.id,
                image: <img src={`/storage/${product.image_url}`} className="w-20 h-20 object-cover"/>,
                name: product.name,
                quantity: product.sold.quantity,
                individual_price: `$${Number(product.price).toFixed(2)}`,
                sale_price: `$${((Number(product.price))*product.sold.quantity).toFixed(2)}`,
            });
        });
        return acc;
    }, []);

    console.log(collapseRows);
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
}

Index.layout = (page) => <Layout children={page} type={'driver'}/>;
export default Index;
