import React, {useState, useContext} from "react";
import {
    Box,
    IconButton,
    useTheme,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import {
    LightModeOutlined as LightModeIcon,
    DarkModeOutlined as DarkModeIcon,
    PersonOutlined as PersonIcon,
} from "@mui/icons-material";
import {ColorModeContext, tokens} from "@/theme.js";
import {Link} from "@inertiajs/react";

const Navbar = ({role}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            p={2}
            sx={{
                backgroundColor: "#FFFFFF",
                color: colors.grey[100],
            }}
        >
            <Box display="flex" alignItems="center">
                <IconButton onClick={handleOpenMenu}>
                    <PersonIcon sx={{color: colors.grey[100]}}/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    sx={{
                        "& .MuiPaper-root": {
                            backgroundColor: colors.primary[900],
                            color: colors.grey[100],
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        },
                    }}
                >
                    <MenuItem
                        onClick={handleCloseMenu}
                        sx={{
                            "&:hover": {
                                backgroundColor: colors.primary[700],
                            },
                        }}
                    >
                        <Link href={route("profile.edit")} style={{textDecoration: "none", color: "inherit"}}>
                            <Typography>Configuración</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            "&:hover": {
                                backgroundColor: colors.primary[700],
                            },
                        }}
                    >
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                            <Typography>Log Out</Typography>
                        </Link>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default Navbar;
