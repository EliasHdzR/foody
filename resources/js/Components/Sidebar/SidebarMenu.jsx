import SidebarMenuItem from './SidebarMenuItem';
function SidebarMenu({ menuItems }) {
    return (
        <div className="sidebar-menu">
            {menuItems.map((item, index) => (
                <SidebarMenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    link={item.link}
                />
            ))}
        </div>
    );
}
export default SidebarMenu;