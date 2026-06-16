import React, { useState, useEffect } from 'react';
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
    Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const PetList = () => {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingPet, setEditingPet] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        especie: '',
        raza: '',
        fechaNacimiento: '',
        peso: '',
        color: '',
        notas: ''
    });

    useEffect(() => {
        loadPets();
    }, [user]);

    const loadPets = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const data = await petService.getByPropietario(user.id);
            setPets(data);
        } catch (error) {
            console.error('Error loading pets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (pet = null) => {
        if (pet) {
            setEditingPet(pet);
            setFormData(pet);
        } else {
            setEditingPet(null);
            setFormData({
                nombre: '',
                especie: '',
                raza: '',
                fechaNacimiento: '',
                peso: '',
                color: '',
                notas: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingPet(null);
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
            const petData = {
                ...formData,
                propietarioId: user.id
            };

            if (editingPet) {
                await petService.update(editingPet.id, petData);
            } else {
                await petService.create(petData);
            }
            await loadPets();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving pet:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta mascota?')) {
            try {
                await petService.delete(id);
                await loadPets();
            } catch (error) {
                console.error('Error deleting pet:', error);
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Mis Mascotas</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                    >
                        Agregar Mascota
                    </Button>
                </Box>

                {loading ? (
                    <Typography>Cargando...</Typography>
                ) : pets.length === 0 ? (
                    <Alert severity="info">No tienes mascotas registradas aún</Alert>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell><strong>Nombre</strong></TableCell>
                                    <TableCell><strong>Especie</strong></TableCell>
                                    <TableCell><strong>Raza</strong></TableCell>
                                    <TableCell><strong>Peso</strong></TableCell>
                                    <TableCell><strong>Acciones</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pets.map(pet => (
                                    <TableRow key={pet.id}>
                                        <TableCell>{pet.nombre}</TableCell>
                                        <TableCell>{pet.especie}</TableCell>
                                        <TableCell>{pet.raza}</TableCell>
                                        <TableCell>{pet.peso} kg</TableCell>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => handleOpenDialog(pet)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleDelete(pet.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>{editingPet ? 'Editar Mascota' : 'Nueva Mascota'}</DialogTitle>
                    <DialogContent sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Especie"
                            name="especie"
                            value={formData.especie}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Raza"
                            name="raza"
                            value={formData.raza}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Fecha de Nacimiento"
                            name="fechaNacimiento"
                            type="date"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="Peso (kg)"
                            name="peso"
                            type="number"
                            value={formData.peso}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Notas"
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            {editingPet ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </motion.div>
    );
};
