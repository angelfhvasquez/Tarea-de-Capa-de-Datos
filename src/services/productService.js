import api from './api';

export const productService = {
    // Productos
    create: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    update: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getByCategory: async (categoriaId) => {
        const response = await api.get(`/products/category/${categoriaId}`);
        return response.data;
    },

    getAvailable: async () => {
        const response = await api.get('/products/available');
        return response.data;
    },

    delete: async (id) => {
        await api.delete(`/products/${id}`);
    },

    updateStock: async (id, cantidad) => {
        await api.put(`/products/${id}/stock/${cantidad}`);
    },

    // Categorías
    createCategory: async (categoryData) => {
        const response = await api.post('/products/categories', categoryData);
        return response.data;
    },

    getAllCategories: async () => {
        const response = await api.get('/products/categories');
        return response.data;
    },

    getCategoryById: async (id) => {
        const response = await api.get(`/products/categories/${id}`);
        return response.data;
    },

    updateCategory: async (id, categoryData) => {
        const response = await api.put(`/products/categories/${id}`, categoryData);
        return response.data;
    },

    deleteCategory: async (id) => {
        await api.delete(`/products/categories/${id}`);
    }
};
