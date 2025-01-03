import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './routes/home.tsx';
import Signup from './routes/signup';
import Signin from './routes/signin';
import { Dashboard } from "./routes/dashboard.tsx";
import { useAuth } from './hooks/authProvider';
import { AuthContextProvider } from './hooks/authProvider';
import Notification from './components/notification';
import Layout from "./components/layout.tsx";
import ProtectedLayout from "./components/protectedLayout.tsx";
import "./App.css";
import { NotificationProvider } from './hooks/notificationContext.tsx';
import Account from "./routes/account.tsx";

function App() {

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { IsAuthenticated } = useAuth();
    if (!IsAuthenticated) {
      return <Navigate to="/sign-in" replace />;
    }
    return <>{children}</>;
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
            </Route>
            <Route path="/" element={<ProtectedLayout />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account/settings"
                element={
                  <ProtectedRoute>
                    <Account />
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
