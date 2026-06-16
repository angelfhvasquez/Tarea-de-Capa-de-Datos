import api from './api';

export const purchaseService = {
    create: async (usuarioId, items) => {
        const response = await api.post(`/purchases?usuarioId=${usuarioId}`, items);
        return response.data;
    },

    confirm: async (id) => {
        const response = await api.put(`/purchases/${id}/confirm`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/purchases/${id}`);
        return response.data;
    },

    getByUsuario: async (usuarioId) => {
        const response = await api.get(`/purchases/usuario/${usuarioId}`);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/purchases');
        return response.data;
    },

    getConfirmed: async () => {
        const response = await api.get('/purchases/confirmed');
        return response.data;
    }
};
