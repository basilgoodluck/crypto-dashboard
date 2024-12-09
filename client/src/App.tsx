import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './routes/home.tsx';
import Signup from './routes/signup';
import Signin from './routes/signin';
import Dashboard from './routes/dashboard';
import { useAuth } from './hooks/authProvider';
import { AuthContextProvider } from './hooks/authProvider';
import Layout from './components/layout.tsx';
// import { useEffect } from 'react';
import "./App.css";


function App() {
  const { IsAuthenticated } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!IsAuthenticated);

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
  };

  const handleSignin = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin onSignin={handleSignin} />} />

            {/* Protected Routes */}
            <Route
              path="/users/:userId/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
