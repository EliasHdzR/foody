import {Link} from "@inertiajs/react";

function SidebarMenuItem({ icon, label, link }) {
    return (
        <Link href={route(`${link}`)} className="sidebar-menu-item">
            <span className={`icon ${icon}`}></span>
            <span className="label">{label}</span>
        </Link>
    );
}

export default SidebarMenuItem;
