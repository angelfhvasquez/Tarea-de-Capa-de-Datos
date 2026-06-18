import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Container,
    Paper,
    TextField,
    Button,
    Box,
    Typography,
    Link,
    Alert,
    CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email es requerido';
        if (!formData.password) newErrors.password = 'Contraseña es requerida';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="sm">
                <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                            PET CENTER - Login
                        </Typography>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                margin="normal"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Ingresar'}
                            </Button>

                            <Typography sx={{ textAlign: 'center' }}>
                                ¿No tienes cuenta?{' '}
                                <Link component={RouterLink} to="/register" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                    Regístrate
                                </Link>
                            </Typography>
                        </form>
                    </Paper>
                </Box>
            </Container>
        </motion.div>
    );
};
