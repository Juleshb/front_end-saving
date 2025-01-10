import { Route,Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import OtpVerify from "./components/OtpVerify";
import Dashboard from "./components/pages/Admin/Dashboard";
import ResetPassword from "./components/resetpassword";
import UsersTable from "./components/pages/Admin/UsersTable";
import Account from "./components/pages/Admin/Account";
import TransactionsTable from "./components/pages/Admin/TransactionsTable";
import Loans from "./components/pages/Admin/Loans";

import UserDashboard from "./components/pages/user/Dashboard";
import UserUsersTable from "./components/pages/user/UsersTable";
import UserAccount from "./components/pages/user/Account";
import UserTransactionsTable from "./components/pages/user/TransactionsTable";
import UserLoans from "./components/pages/user/Loans";

function App() {
  return (
    <>
     <Routes>      
       <Route path="/Signup" element={<Signup/>}/> 
       <Route path="/OtpVerify" element={<OtpVerify/>}/> 
       <Route path="/reset-password" element={<ResetPassword/>}/> 
       <Route path="/" element={<Login/>}/> 
       <Route path="/Dashboard" element={<Dashboard/>}/> 
       <Route path="/Account" element={<Account/>}/>
       <Route path="/Transactions" element={<TransactionsTable/>}/> 
       <Route path="/loans" element={<Loans/>}/> 
       <Route path="/users" element={<UsersTable/>}/> 


       <Route path="/userDashboard" element={<UserDashboard/>}/> 
       <Route path="/userAccount" element={<UserAccount/>}/>
       <Route path="/userTransactions" element={<UserTransactionsTable/>}/> 
       <Route path="/userloans" element={<UserLoans/>}/> 
       <Route path="/userusers" element={<UserUsersTable/>}/> 

     </Routes>
     </> 
  );
}

export default App;
