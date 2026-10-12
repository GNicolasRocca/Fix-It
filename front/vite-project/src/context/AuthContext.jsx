import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const updateUser = (updatedUser) => {
    setUser((current) => {
      if (!current || current.userId !== updatedUser.userId) return current;
      return {
        ...current,
        name: updatedUser.name,
        username: updatedUser.username,
        birthdate: updatedUser.birthdate,
      };
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};