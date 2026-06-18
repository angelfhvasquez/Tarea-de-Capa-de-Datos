import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Typography,
    Box,
    CircularProgress,
    TextField,
    MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';

export const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [productsData, categoriesData] = await Promise.all([
                productService.getAvailable(),
                productService.getAllCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.categoriaId === parseInt(selectedCategory));

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Nuestros Productos
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        select
                        label="Filtrar por Categoría"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="all">Todas las Categorías</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>
                        ))}
                    </TextField>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filteredProducts.map(product => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            sx={{
                                                height: 200,
                                                backgroundColor: '#e0e0e0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '3rem'
                                            }}
                                        >
                                            🛍️
                                        </CardMedia>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {product.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                                {product.descripcion}
                                            </Typography>
                                            <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                                                ${product.precio}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                Stock: {product.stock}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={() => onAddToCart(product)}
                                                disabled={product.stock === 0}
                                            >
                                                🛒 Agregar al Carrito
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </motion.div>
    );
};
