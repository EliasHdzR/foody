import SidebarMenuItem from './SidebarMenuItem';

function SidebarMenu({ menuItems }) {
    return (
        <div className="sidebar-menu px-4 py-6 space-y-2">
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
