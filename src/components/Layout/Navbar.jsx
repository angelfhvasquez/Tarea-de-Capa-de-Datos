import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Menu,
    MenuItem,
    Avatar
} from '@mui/material';

export const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#2c3e50' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    🐾 PET CENTER
                </Typography>

                {isAuthenticated ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/dashboard')}
                        >
                            📊 Dashboard
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/pets')}
                        >
                            Mascotas
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/appointments')}
                        >
                            Citas
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/products')}
                        >
                            Tienda
                        </Button>

                        <Button
                            onClick={handleMenuOpen}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#3f51b5' }}>
                                {user?.nombre?.charAt(0)}
                            </Avatar>
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem disabled>
                                {user?.nombre} {user?.apellido}
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                🔓 Cerrar Sesión
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/login')}
                        >
                            Ingresar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/register')}
                        >
                            Registrarse
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
