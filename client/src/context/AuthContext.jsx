import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setLoading(false);
        } else {
            axios
                .get("http://localhost:5200/user/profile", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setUser(res.data);
                    sessionStorage.setItem('user', JSON.stringify(res.data));
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    }, []);

    const login = async (email, password, role) => {
        try {
            const res = await axios.post("http://localhost:5200/login", { email, password, role }, { withCredentials: true });
            setUser(res.data);
            sessionStorage.setItem('user', JSON.stringify(res.data));
            sessionStorage.setItem('token', res.data.token);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:5200/logout", {}, { withCredentials: true });
            setUser(null);
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
