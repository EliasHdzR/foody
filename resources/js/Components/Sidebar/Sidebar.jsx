import {SidebarFooter} from './SidebarFooter'
import {SidebarHeader} from './SidebarHeader'
import {SidebarMenu} from './SidebarMenu'

function Sidebar() {
    return (
        <div className="sidebar">
            <SidebarHeader />
            <SidebarMenu />
            <SidebarFooter />
        </div>
    );
}

export default Sidebar;