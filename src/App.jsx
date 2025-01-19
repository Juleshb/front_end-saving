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

function App() {
  return (
    <AuthProvider>
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
            <ProtectedRoute requiredRole="user">
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
