import Asidebar from "@/Components/Asidebar";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartAside = ({items, subtotal, shipping, tax, total, discount, onCheckout, onRemove, onIncrease, onDecrease, onApplyCoupon, coupons}) => {
    return (
        <Asidebar
            title="Carrito"
            sx={{
                position: "sticky",
                top: 0,
                overflowY: "auto",
            }}
        >
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#fff",
                        padding: "10px 0",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <span>Artículo</span>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "150px",
                        }}
                    >
                        <span>Cant</span>
                        <span>Precio</span>
                        <span></span>
                    </div>
                </div>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        quantity={item.quantity}
                        onRemove={() => onRemove(item.id)}
                        onIncrease={() => onIncrease(item.id)}
                        onDecrease={() => onDecrease(item.id)}
                    />
                ))}
            </div>
            <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                discount={discount}
                onCheckout={onCheckout}
                onApplyCoupon={onApplyCoupon}
                coupons={coupons}
            />
        </Asidebar>
    );
};

export default CartAside;
