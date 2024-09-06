import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password, role) => {
        try {
            const res = await axios.post("http://localhost:5200/login", { email, password, role }, { withCredentials: true });
            // const user = await axios.get("http://localhost:5200/profile", { withCredentials: true });
            // setUser(user.data);
            setUser(res.data);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:5200/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
