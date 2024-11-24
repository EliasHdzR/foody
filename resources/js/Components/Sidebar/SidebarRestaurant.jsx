import SidebarFooter from './SidebarFooter'
import SidebarMenu from './SidebarMenu'

const menuItems = [
    { label: 'Inicio', icon: 'home-icon', link: 'restaurante.dashboard' },
    { label: 'Productos', icon: 'product-icon', link: 'restaurante.products.index' },
    { label: 'Ingredientes', icon: 'product-icon', link: 'restaurante.ingredients.index' },
    { label: 'Tickets', icon: 'ticket-icon', link: 'restaurante.dashboard' },
    { label: 'Promociones', icon: 'promo-icon', link: 'restaurante.dashboard' },
];
function SidebarRestaurant() {
    return (
        <div className="sidebar">
            <SidebarMenu menuItems={menuItems} />
            <SidebarFooter />
        </div>
    );
}

export default SidebarRestaurant;
