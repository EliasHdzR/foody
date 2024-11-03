import SidebarFooter from './SidebarFooter'
import SidebarMenu from './SidebarMenu'

const menuItems = [
    { label: 'Inicio', icon: 'home-icon', link: '/inicio' },
    { label: 'Tickets', icon: 'ticket-icon', link: '/tickets' },
    { label: 'Restaurantes', icon: 'restaurant-icon', link: '/restaurantes' },
    { label: 'Repartidores', icon: 'delivery-icon', link: '/repartidores' },
    { label: 'Usuarios', icon: 'user-icon', link: '/usuarios' },
    { label: 'Reportes', icon: 'report-icon', link: '/reportes' },
    { label: 'Promociones', icon: 'promo-icon', link: '/promociones' },
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