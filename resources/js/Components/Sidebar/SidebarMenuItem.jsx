function SidebarMenuItem({ icon, label, link }) {
    return (
        <a href={link} className="sidebar-menu-item">
            <span className={`icon ${icon}`}></span>
            <span className="label">{label}</span>
        </a>
    );
}

export default SidebarMenuItem;
