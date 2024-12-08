import moment from 'moment';

const OrderCard = ({
                       status,
                       updated_at,
                       total_price,
                       restaurant,
                       restaurant_image,
                       onViewDetails,
                       onCancelOrder
                   }) => {

    const formattedDate = moment(updated_at).format("DD/MM/YYYY");

    return (
        <div style={{
            backgroundColor: "#2C2C34",
            borderRadius: "8px",
            padding: "20px",
            margin: "10px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            {/* Contenedor para la imagen */}
            <div style={{
                marginRight: "20px",
                display: "flex",
                alignItems: "center"
            }}>
                <img
                    src={`/storage/${restaurant_image}`}
                    alt={restaurant?.name || "Imagen del restaurante"}
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        objectFit: "cover"
                    }}
                />
            </div>

            {/* Contenedor para la información */}
            <div style={{
                flex: 1, // Ocupa el espacio restante
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <p style={{color: "#FF9E00", margin: "0"}}>
                    Estado: {status === 'canceled_customer' ? 'Cancelado por el usuario' : status} - {formattedDate}
                </p>
                <p style={{color: "#fff", margin: "5px 0 0"}}>{restaurant?.name}</p>
                <p style={{color: "#fff", margin: "0"}}>MX${total_price}</p>
            </div>

            {/* Contenedor para los botones */}
            <div>
                {onViewDetails && (
                    <button
                        style={{
                            backgroundColor: "#FF9E00",
                            color: "#fff",
                            padding: "10px",
                            borderRadius: "5px",
                            marginRight: "10px"
                        }}
                        onClick={onViewDetails}
                    >
                        Ver Detalles
                    </button>
                )}
                {status !== 'canceled_customer' && onCancelOrder && (
                    <button
                        style={{
                            backgroundColor: "#FF0000",
                            color: "#fff",
                            padding: "10px",
                            borderRadius: "5px"
                        }}
                        onClick={onCancelOrder}
                    >
                        Cancelar Pedido
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;
