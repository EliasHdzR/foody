function SidebarMenuItem({ icon, label, link }) {
    return (
        <a href={route(`${link}`)} className="sidebar-menu-item">
            <span className={`icon ${icon}`}></span>
            <span className="label">{label}</span>
        </a>
    );
}

export default SidebarMenuItem;
