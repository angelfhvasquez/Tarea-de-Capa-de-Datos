import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboardService';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    CircularProgress
} from '@mui/material';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';

export const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await dashboardService.getStats();
            setStats(data);
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!stats) {
        return <Typography>Error al cargar datos</Typography>;
    }

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Paper sx={{ p: 3, backgroundColor: color, color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Icon sx={{ fontSize: 40 }} />
                    <Box>
                        <Typography variant="body2">{title}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {value}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );

    const appointmentData = [
        { name: 'Programadas', value: stats.citasPendientes },
        { name: 'Confirmadas', value: stats.citasConfirmadas }
    ];

    const COLORS = ['#FF6384', '#36A2EB'];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                    Dashboard - PET CENTER
                </Typography>

                {/* Cards de Estadísticas */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            icon={EventNoteIcon}
                            title="Total de Citas"
                            value={stats.totalCitas}
                            color="#3f51b5"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            icon={EventNoteIcon}
                            title="Citas Confirmadas"
                            value={stats.citasConfirmadas}
                            color="#4caf50"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            icon={StorefrontIcon}
                            title="Total de Ventas"
                            value={stats.totalVentas}
                            color="#ff9800"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            icon={InventoryIcon}
                            title="Productos Disponibles"
                            value={stats.productosDisponibles}
                            color="#e91e63"
                        />
                    </Grid>
                </Grid>

                {/* Gráficos */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Estado de Citas
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={appointmentData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {COLORS.map((color, index) => (
                                            <Cell key={`cell-${index}`} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Ventas
                            </Typography>
                            <Box sx={{ fontSize: '0.9rem' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Ventas Totales:</Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        ${stats.ventasTotales.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>Ventas del Mes:</Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        ${stats.ventasDelMes.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </motion.div>
    );
};
