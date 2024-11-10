import SidebarMenuItem from './SidebarMenuItem';

function SidebarFooter() {
    return (
        <div className="sidebar-footer border-t border-gray-200 p-4">
            <SidebarMenuItem icon="settings-icon" label="Configuración" link="/configuracion" />
            <SidebarMenuItem icon="logout-icon" label="Cerrar sesión" link="/register" />
        </div>
    );
}

export default SidebarFooter;
