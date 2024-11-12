import SidebarFooter from './SidebarFooter'
import SidebarMenu from './SidebarMenu'

const menuItems = [
    { label: 'Inicio', icon: 'home-icon', link: 'dashboard' },
    { label: 'Tickets', icon: 'ticket-icon', link: 'dashboard' },
    { label: 'Restaurantes', icon: 'restaurant-icon', link: 'admin.restaurant.index' },
    { label: 'Repartidores', icon: 'delivery-icon', link: 'admin.drivers.index' },
    { label: 'Usuarios', icon: 'user-icon', link: 'admin.users.index' },
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
