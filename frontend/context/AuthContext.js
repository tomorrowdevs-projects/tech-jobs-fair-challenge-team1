'use client'
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
            } else {
                console.error('Failed to login:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to login:', error);
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
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
