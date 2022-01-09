import React, { createContext, useState, useEffect, useContext } from 'react';
import api from "../service/api";
import {getUserById} from "../service/user/user.service";

interface user {
    _id: string;
    collections: ReadonlyArray<string>;
    email: string;
    username: string;
}

interface AuthContextData {
    signed: boolean;
    user: user | null;
    Login(username: string, password: string): Promise<void>;
    Logout(): void;
    SignUp(username: string, email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<user | null>(null);

    useEffect(() => {
        const storageUser = sessionStorage.getItem('@App:user');
        const storageToken = sessionStorage.getItem('@App:token');

        if (storageToken && storageUser) {
            setUser(JSON.parse(storageUser));
            api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
        }
    }, []);

    const Login = async (username: string, password: string) => {
        const loginRes = await api.post('/login', { username, password });

        api.defaults.headers.common['Authorization'] = `Bearer ${loginRes.data.access_token}`;

        const loggedUserRes = await api.get('/logged-user');
        const userRes = await getUserById(loggedUserRes.data.userId)
        setUser(userRes);
        //
        sessionStorage.setItem('@App:user', JSON.stringify(userRes));
        sessionStorage.setItem('@App:token', loginRes.data.access_token);
    }

    const SignUp = async (username: string, email: string, password: string) => {
        await api.post('/users', { username, email, password });
        await Login(username, password);
    }

    const Logout = () => {
        setUser(null);
        sessionStorage.clear();
    }

    return (
        <AuthContext.Provider
            value={{ signed: Boolean(user), user, Login, Logout, SignUp }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}