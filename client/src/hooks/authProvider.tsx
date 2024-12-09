import { useContext, createContext, useState } from "react";

interface AuthContextType {
  IsAuthenticated: boolean;
  SignIn: (token: string) => void;
  SignOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  IsAuthenticated: false,
  SignIn: () => {},
  SignOut: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("authToken"));

  const SignIn = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token);
  };

  const SignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ IsAuthenticated, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
