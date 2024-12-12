import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './routes/home.tsx';
import Signup from './routes/signup';
import Signin from './routes/signin';
import Dashboard from './routes/dashboard';
import { useAuth } from './hooks/authProvider';
import { AuthContextProvider } from './hooks/authProvider';
import Notification from './components/notification';
import Layout from "./components/layout.tsx";
import "./App.css";
import { NotificationProvider } from './hooks/notificationContext.tsx';

function App() {
  const { IsAuthenticated } = useAuth();
  

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return IsAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
  };

  return (
    <NotificationProvider>
      <AuthContextProvider>
        <Router>
          <Notification /> 
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
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
    </NotificationProvider>
  );
}

export default App;
