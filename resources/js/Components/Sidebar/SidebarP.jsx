import {useState} from "react";
import {Box, Typography, useTheme, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {tokens} from "@/theme.js";

const SidebarItem = ({title, to, icon, selected, setSelected, isCollapsed}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            component={Link}
            to={to}
            onClick={() => setSelected(title)}
            sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                padding: isCollapsed ? "10px 15px" : "10px 20px",
                color: selected === title ? colors.blueAccent[300] : colors.grey[100],
                backgroundColor: selected === title ? colors.primary[800] : "transparent",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                    backgroundColor: colors.primary[900],
                },
            }}
        >
            {icon}
            {!isCollapsed && (
                <Typography
                    variant="body1"
                    ml="10px"
                    fontWeight="500"
                    color="inherit"
                >
                    {title}
                </Typography>
            )}
        </Box>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Inicio");
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box
            sx={{
                width: isCollapsed ? "80px" : "250px",
                height: "100vh",
                backgroundColor: colors.primary[400],
                display: "flex",
                flexDirection: "column",
                padding: "10px 0",
                boxShadow: theme.shadows[4],
                transition: "width 0.3s ease",
            }}
        >
            {/* Header */}
            <Box
                display="flex"
                justifyContent={isCollapsed ? "center" : "space-between"}
                alignItems="center"
                p="10px 20px"
            >
                {!isCollapsed && (
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        color={colors.greenAccent[600]}
                    >
                        foody
                    </Typography>
                )}
                <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    sx={{color: colors.grey[100]}}
                >
                    <MenuOutlinedIcon/>
                </IconButton>
            </Box>

            {/* Menu Items */}
            <Box
                sx={{
                    marginTop: "20px",
                    padding: "5px 10px",
                    flex: 1,
                }}
            >
                {[
                    {title: "Inicio", to: "/", icon: <HomeOutlinedIcon fontSize="small"/>},
                    {title: "Usuarios", to: "/usuarios", icon: <PeopleOutlineOutlinedIcon fontSize="small"/>},
                    {title: "FAQ", to: "/FAQ", icon: <PeopleOutlineOutlinedIcon fontSize="small"/>},
                ].map((item) => (
                    <SidebarItem
                        key={item.title}
                        title={item.title}
                        to={item.to}
                        icon={item.icon}
                        selected={selected}
                        setSelected={setSelected}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </Box>

            <Box sx={{padding: "5px 10px"}}>
                <SidebarItem
                    title="Configuración"
                    to="/configuracion"
                    icon={<SettingsOutlinedIcon fontSize="small"/>}
                    selected={selected}
                    setSelected={setSelected}
                    isCollapsed={isCollapsed}
                />
                <SidebarItem
                    title="Cerrar sesión"
                    to="/logout"
                    icon={<LogoutOutlinedIcon fontSize="small"/>}
                    selected={selected}
                    setSelected={setSelected}
                    isCollapsed={isCollapsed}
                />
            </Box>
        </Box>
    );
};

export default Sidebar;
