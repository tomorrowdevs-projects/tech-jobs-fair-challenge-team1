import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useRole = () => {
    const { user } = useContext(AuthContext);

    const isAdmin = user?.role === 'admin';
    const isMaintainer = user?.role === 'maintainer';

    return { isAdmin, isMaintainer };
};