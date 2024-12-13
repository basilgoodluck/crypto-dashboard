import { useContext, createContext, useState } from "react";

interface AuthContextType {
  IsAuthenticated: boolean;
  username: string
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
  const [username, setUsername] = useState<string>("")

  const SignIn = (token: string, username: string) => {
    if(token){
      setIsAuthenticated(true);
      setUsername(username)
      localStorage.setItem("authToken", token);
      console.log(IsAuthenticated)
    }
  };  

  const SignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
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
