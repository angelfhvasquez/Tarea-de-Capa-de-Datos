import React, { useState } from 'react';
import { purchaseService } from '../../services/purchaseService';
import { useAuth } from '../../context/AuthContext';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from '@mui/material';
import { motion } from 'framer-motion';

export const Cart = ({ cartItems, onRemoveItem, onCheckout }) => {
    const { user } = useAuth();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const purchaseItems = cartItems.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                subtotal: item.precio * item.cantidad
            }));

            const purchase = await purchaseService.create(user.id, purchaseItems);
            await purchaseService.confirm(purchase.id);
            setConfirmOpen(false);
            onCheckout();
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Carrito de Compras
                </Typography>

                {cartItems.length === 0 ? (
                    <Alert severity="info">El carrito está vacío</Alert>
                ) : (
                    <>
                        <TableContainer component={Paper} sx={{ mb: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableCell><strong>Producto</strong></TableCell>
                                        <TableCell><strong>Precio</strong></TableCell>
                                        <TableCell><strong>Cantidad</strong></TableCell>
                                        <TableCell><strong>Subtotal</strong></TableCell>
                                        <TableCell><strong>Acciones</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.nombre}</TableCell>
                                            <TableCell>${item.precio}</TableCell>
                                            <TableCell>{item.cantidad}</TableCell>
                                            <TableCell>${(item.precio * item.cantidad).toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    onClick={() => onRemoveItem(item.id)}
                                                >
                                                    🗑️ Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                            <Paper sx={{ p: 2, width: 300 }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Resumen de Compra
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography>Subtotal:</Typography>
                                    <Typography>${total.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 'bold' }}>
                                    <Typography>Total:</Typography>
                                    <Typography>${total.toFixed(2)}</Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="success"
                                    onClick={() => setConfirmOpen(true)}
                                >
                                    Confirmar Compra
                                </Button>
                            </Paper>
                        </Box>

                        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                            <DialogTitle>Confirmar Compra</DialogTitle>
                            <DialogContent>
                                <Typography>
                                    ¿Deseas confirmar tu compra por ${total.toFixed(2)}?
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
                                <Button
                                    onClick={handleCheckout}
                                    variant="contained"
                                    color="success"
                                    disabled={loading}
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </Container>
        </motion.div>
    );
};
