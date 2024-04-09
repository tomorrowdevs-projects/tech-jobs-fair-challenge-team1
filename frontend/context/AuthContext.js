'use client'
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
                const userData = await response.json();
                setUser(userData?.user);
                localStorage.setItem('user', JSON.stringify(userData?.user));
            } else {
                console.error('Failed to login:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };
    const checkLocalStorage = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    };
    useEffect(() => {
        checkLocalStorage();
        setIsLoading(false);
    }, []);

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
