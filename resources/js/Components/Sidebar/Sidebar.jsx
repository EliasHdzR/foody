import SidebarFooter from './SidebarFooter'
import SidebarHeader from './SidebarHeader'
import SidebarMenu from './SidebarMenu'


function Sidebar() {
    const menuItems = [
        { label: 'Inicio', icon: 'home-icon', link: '/inicio' },
        { label: 'Tickets', icon: 'ticket-icon', link: '/tickets' },
        { label: 'Restaurantes', icon: 'restaurant-icon', link: '/restaurantes' },
        { label: 'Repartidores', icon: 'delivery-icon', link: '/repartidores' },
        { label: 'Usuarios', icon: 'user-icon', link: '/usuarios' },
        { label: 'Reportes', icon: 'report-icon', link: '/reportes' },
        { label: 'Promociones', icon: 'promo-icon', link: '/promociones' },
    ];
    return (
        <div className="sidebar">
            <SidebarHeader />
            <SidebarMenu menuItems={menuItems} />
            <SidebarFooter />
        </div>
    );
}

export default Sidebar;