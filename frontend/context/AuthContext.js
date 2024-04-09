'use client'
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkLocalStorage = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData).user);
            }
            setIsLoading(false);
        };

        checkLocalStorage();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const { access_token } = await response.json();
                const userResponse = await fetch('/api/me', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    localStorage.setItem('user', JSON.stringify({ access_token, user: userData }));
                    setUser(userData);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/signOut', {
                method: 'POST',
            });
            setUser(null);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout,isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
