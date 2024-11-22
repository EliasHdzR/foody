import SidebarFooter from './SidebarFooter'
import SidebarMenu from './SidebarMenu'

const menuItems = [
    { label: 'Inicio', icon: 'home-icon', link: 'admin.dashboard' },
    { label: 'Tickets', icon: 'ticket-icon', link: 'admin.dashboard' },
    { label: 'Restaurantes', icon: 'restaurant-icon', link: 'admin.restaurant.index' },
    { label: 'Repartidores', icon: 'delivery-icon', link: 'admin.drivers.index' },
    { label: 'Clientes', icon: 'user-icon', link: 'admin.customers.index' },
    { label: 'Reportes', icon: 'report-icon', link: 'admin.reports.index' },
    { label: 'Promociones', icon: 'promo-icon', link: 'admin.promotions.index' },
];
function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarMenu menuItems={menuItems} />
            <SidebarFooter />
        </div>
    );
}

export default Sidebar;
