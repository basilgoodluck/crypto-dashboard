import { useContext, createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../api/refreshToken";
interface AuthContextType {
  IsAuthenticated: boolean;
  username: string;
  SignIn: (token: string, username: string) => void;
  SignOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  IsAuthenticated: false,
  username: '',
  SignIn: () => {},
  SignOut: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("authToken"));
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "");

  const validateToken = (token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

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
    const storedUsername = localStorage.getItem("username");

    if (storedToken && validateToken(storedToken)) {
      setIsAuthenticated(true);
      setUsername(storedUsername || "");
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

  const SignIn = (token: string, username: string) => {
    if (token) {
      setIsAuthenticated(true);
      setUsername(username);
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
    }
  };

  const SignOut = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ IsAuthenticated, username, SignIn, SignOut }}>
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
