import SidebarFooter from './SidebarFooter'
import SidebarMenu from './SidebarMenu'

const menuItems = [
    { label: 'Inicio', icon: 'home-icon', link: 'driver.dashboard' },
];
function SidebarDriver() {
    return (
        <div className="sidebar">
            <SidebarMenu menuItems={menuItems} />
            <SidebarFooter />
        </div>
    );
}

export default SidebarDriver;
