import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Layout/Navbar';
import { PrivateRoute } from './components/Layout/PrivateRoute';

// Auth Components
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';

// Pet Components
import { PetList } from './components/Pets/PetList';

// Appointment Components
import { AppointmentList } from './components/Appointments/AppointmentList';

// Product Components
import { ProductList } from './components/Products/ProductList';

// Cart Component
import { Cart } from './components/Cart/Cart';

// Dashboard Component
import { Dashboard } from './components/Dashboard/Dashboard';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        success: {
            main: '#4caf50',
        },
        warning: {
            main: '#ff9800',
        },
        error: {
            main: '#f44336',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

function AppContent() {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, cantidad: 1 }]);
        }
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const handleCheckout = () => {
        setCartItems([]);
        alert('¡Compra realizada exitosamente!');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ flex: 1 }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Private Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pets"
                        element={
                            <PrivateRoute>
                                <PetList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/appointments"
                        element={
                            <PrivateRoute>
                                <AppointmentList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <PrivateRoute>
                                <ProductList onAddToCart={handleAddToCart} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute>
                                <Cart
                                    cartItems={cartItems}
                                    onRemoveItem={handleRemoveFromCart}
                                    onCheckout={handleCheckout}
                                />
                            </PrivateRoute>
                        }
                    />

                    {/* Default Routes */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
}
