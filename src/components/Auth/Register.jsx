import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { motion } from 'framer-motion';

export const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'Apellido es requerido';
        if (!formData.email) newErrors.email = 'Email es requerido';
        if (!formData.telefono) newErrors.telefono = 'Teléfono es requerido';
        if (!formData.password) newErrors.password = 'Contraseña es requerida';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
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
            const { confirmPassword, ...userData } = formData;
            await register(userData);
            navigate('/dashboard');
        } catch (err) {
            console.error('Register error:', err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="sm">
                <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                        <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
                            PET CENTER - Registro
                        </Typography>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                error={!!errors.nombre}
                                helperText={errors.nombre}
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                label="Apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                error={!!errors.apellido}
                                helperText={errors.apellido}
                                margin="normal"
                            />

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
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                error={!!errors.telefono}
                                helperText={errors.telefono}
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

                            <TextField
                                fullWidth
                                label="Confirmar Contraseña"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
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
                                {loading ? <CircularProgress size={24} /> : 'Registrarse'}
                            </Button>

                            <Typography sx={{ textAlign: 'center' }}>
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/login" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                    Inicia sesión
                                </Link>
                            </Typography>
                        </form>
                    </Paper>
                </Box>
            </Container>
        </motion.div>
    );
};
