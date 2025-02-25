import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import OtpVerify from "./components/OtpVerify";
import ResetPassword from "./components/resetpassword";

import Dashboard from "./components/pages/Admin/Dashboard";
import UsersTable from "./components/pages/Admin/UsersTable";
import Account from "./components/pages/Admin/Account";
import TransactionsTable from "./components/pages/Admin/TransactionsTable";
import Loans from "./components/pages/Admin/Loans";

import UserDashboard from "./components/pages/user/Dashboard";
import UserUsersTable from "./components/pages/user/UsersTable";
import UserAccount from "./components/pages/user/Account";
import UserTransactionsTable from "./components/pages/user/TransactionsTable";
import UserLoans from "./components/pages/user/Loans";

import { AuthProvider } from "./components/authocontex";
import ProtectedRoute from "./components/ProtectedRoute";
import Notfound from "./components/404";
import { Icon } from '@iconify/react';
function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event); // Save the event for later
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the saved prompt
      });
    }
  };

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Install Our App!", {
        body: "Add this app to your home screen for easy access.",
        icon: "/icons/icon-192x192.png",
      });
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      requestNotificationPermission();
    }
  }, []);

  return (
    <AuthProvider>
      
          {deferredPrompt && (
           
<div className="bg-primary flex justify-center p-2  text-white fixed inset-x-0 top-0 z-50">
<Icon icon="line-md:bell-alert-filled" width="25" height="25" className="animate-bounce text-yellow-500"/>
  <p className="text-center text-xs m-2 font-medium"> CEPEDHU app is available for installation. Please
   click 
    <a href="#" className="inline-block underline m-2" onClick={handleInstallClick}> here to install CEPEDHU app </a>
  </p>
</div>

          )}
       
          <Routes>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/OtpVerify" element={<OtpVerify />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Account"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Transactions"
              element={
                <ProtectedRoute requiredRole="admin">
                  <TransactionsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Loans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UsersTable />
                </ProtectedRoute>
              }
            />

            <Route
              path="/userDashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userAccount"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userTransactions"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserTransactionsTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userloans"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserLoans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userusers"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserUsersTable />
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<Notfound />} />
          </Routes>
        
    </AuthProvider>
  );
}

export default App;
