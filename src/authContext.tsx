import { createContext, useContext, useState } from "react";

interface AuthContextProps {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};