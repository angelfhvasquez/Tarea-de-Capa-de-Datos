import api from './api';

export const appointmentService = {
    create: async (appointmentData) => {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    },

    update: async (id, appointmentData) => {
        const response = await api.put(`/appointments/${id}`, appointmentData);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/appointments/${id}`);
        return response.data;
    },

    getByUsuario: async (usuarioId) => {
        const response = await api.get(`/appointments/usuario/${usuarioId}`);
        return response.data;
    },

    getByVeterinario: async (veterinarioId) => {
        const response = await api.get(`/appointments/veterinario/${veterinarioId}`);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/appointments');
        return response.data;
    },

    confirm: async (id) => {
        const response = await api.put(`/appointments/${id}/confirm`);
        return response.data;
    },

    assignVeterinario: async (id, veterinarioId) => {
        const response = await api.put(`/appointments/${id}/assign-veterinario/${veterinarioId}`);
        return response.data;
    },

    reschedule: async (id, newDateTime) => {
        const response = await api.put(`/appointments/${id}/reschedule`, null, {
            params: { newDateTime }
        });
        return response.data;
    },

    cancel: async (id) => {
        await api.put(`/appointments/${id}/cancel`);
    },

    getAvailable: async () => {
        const response = await api.get('/appointments/available');
        return response.data;
    }
};
