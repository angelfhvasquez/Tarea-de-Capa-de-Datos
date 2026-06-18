import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../services/appointmentService';
import { petService } from '../../services/petService';
import { useAuth } from '../../context/AuthContext';
import {
    Container,
    Paper,
    TextField,
    Button,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { motion } from 'framer-motion';

export const AppointmentList = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [formData, setFormData] = useState({
        fechaHora: '',
        razon: '',
        mascotaId: '',
        diagnostico: '',
        tratamiento: ''
    });

    useEffect(() => {
        loadData();
    }, [user]);

    const loadData = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const [appointmentsData, petsData] = await Promise.all([
                appointmentService.getByUsuario(user.id),
                petService.getByPropietario(user.id)
            ]);
            setAppointments(appointmentsData);
            setPets(petsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (appointment = null) => {
        if (appointment) {
            setEditingAppointment(appointment);
            setFormData({
                fechaHora: appointment.fechaHora,
                razon: appointment.razon,
                mascotaId: appointment.mascotaId,
                diagnostico: appointment.diagnostico || '',
                tratamiento: appointment.tratamiento || ''
            });
        } else {
            setEditingAppointment(null);
            setFormData({
                fechaHora: '',
                razon: '',
                mascotaId: '',
                diagnostico: '',
                tratamiento: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingAppointment(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const appointmentData = {
                ...formData,
                usuarioId: user.id
            };

            if (editingAppointment) {
                await appointmentService.update(editingAppointment.id, appointmentData);
            } else {
                await appointmentService.create(appointmentData);
            }
            await loadData();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    const handleCancel = async (id) => {
        if (window.confirm('¿Está seguro de cancelar esta cita?')) {
            try {
                await appointmentService.cancel(id);
                await loadData();
            } catch (error) {
                console.error('Error canceling appointment:', error);
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Mis Citas Veterinarias</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog()}
                    >
                        ➕ Nueva Cita
                    </Button>
                </Box>

                {loading ? (
                    <Typography>Cargando...</Typography>
                ) : appointments.length === 0 ? (
                    <Alert severity="info">No tienes citas programadas aún</Alert>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell><strong>Fecha</strong></TableCell>
                                    <TableCell><strong>Mascota</strong></TableCell>
                                    <TableCell><strong>Razón</strong></TableCell>
                                    <TableCell><strong>Estado</strong></TableCell>
                                    <TableCell><strong>Acciones</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map(apt => (
                                    <TableRow key={apt.id}>
                                        <TableCell>{new Date(apt.fechaHora).toLocaleString()}</TableCell>
                                        <TableCell>{apt.mascotaNombre}</TableCell>
                                        <TableCell>{apt.razon}</TableCell>
                                        <TableCell>{apt.estado}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleOpenDialog(apt)}
                                            >
                                                ✏️
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleCancel(apt.id)}
                                            >
                                                🗑️
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>{editingAppointment ? 'Editar Cita' : 'Nueva Cita'}</DialogTitle>
                    <DialogContent sx={{ pt: 2 }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Mascota</InputLabel>
                            <Select
                                name="mascotaId"
                                value={formData.mascotaId}
                                onChange={handleChange}
                                label="Mascota"
                            >
                                {pets.map(pet => (
                                    <MenuItem key={pet.id} value={pet.id}>{pet.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Fecha y Hora"
                            name="fechaHora"
                            type="datetime-local"
                            value={formData.fechaHora}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="Razón de la Cita"
                            name="razon"
                            value={formData.razon}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <TextField
                            fullWidth
                            label="Diagnóstico"
                            name="diagnostico"
                            value={formData.diagnostico}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <TextField
                            fullWidth
                            label="Tratamiento"
                            name="tratamiento"
                            value={formData.tratamiento}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            {editingAppointment ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </motion.div>
    );
};
