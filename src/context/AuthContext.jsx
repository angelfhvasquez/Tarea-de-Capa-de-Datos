import React, { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(userData);
            setUser(response);
            setIsAuthenticated(true);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            setUser(response);
            setIsAuthenticated(true);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
    }, []);

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
