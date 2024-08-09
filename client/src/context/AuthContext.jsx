import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5200/user/profile", { withCredentials: true })
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    setUser(null);
                } else {
                    console.log(err);
                }
                setLoading(false);
            });
    }, []);

    const login = async (email, password) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const res = await axios.post("http://localhost:5200/login", { email, password }, { withCredentials: true });
            setUser(res.data);
        } catch (err) {
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
