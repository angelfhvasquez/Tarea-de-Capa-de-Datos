import api from './api';

export const petService = {
    create: async (petData) => {
        const response = await api.post('/pets', petData);
        return response.data;
    },

    update: async (id, petData) => {
        const response = await api.put(`/pets/${id}`, petData);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/pets/${id}`);
        return response.data;
    },

    getByPropietario: async (propietarioId) => {
        const response = await api.get(`/pets/propietario/${propietarioId}`);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/pets');
        return response.data;
    },

    delete: async (id) => {
        await api.delete(`/pets/${id}`);
    }
};
