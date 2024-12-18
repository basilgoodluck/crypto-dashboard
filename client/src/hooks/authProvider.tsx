import { useContext, createContext, useState, useEffect } from "react";
import { validateToken } from "../api/refreshToken";
import API from "../api/refreshToken";
interface AuthContextType {
  IsAuthenticated: boolean;
  SignIn: (token: string, username: string) => void;
  SignOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  IsAuthenticated: false,
  SignIn: () => {},
  SignOut: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("authToken"));

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await API.post("/api/refresh-token", { token: refreshToken });
      const { authToken } = response.data;

      localStorage.setItem("authToken", authToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to refresh auth token:", error);
      SignOut(); 
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken && validateToken(storedToken)) {
      setIsAuthenticated(true);
    } else if (storedToken) {
      refreshAuthToken();
    }
  }, []);

  useEffect(() => {
    if (IsAuthenticated) {
      const interval = setInterval(() => {
        const token = localStorage.getItem("authToken");
        if (token && !validateToken(token)) {
          refreshAuthToken();
        }
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [IsAuthenticated]);

  const SignIn = (token: string) => {
    if (token) {
      setIsAuthenticated(true);
      localStorage.setItem("authToken", token);
    }
  };

  const SignOut = () => {
    setIsAuthenticated(false);
    localStorage.clear()
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
