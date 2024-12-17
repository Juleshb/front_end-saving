import { Route,Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/Login";
import OtpVerify from "./components/OtpVerify";
import Dashboard from "./components/pages/Admin/Dashboard";
import Account from "./components/pages/Admin/Account";
function App() {
  return (
    <>
     <Routes>      
       <Route path="/Signup" element={<Signup/>}/> 
       <Route path="/OtpVerify" element={<OtpVerify/>}/> 
       <Route path="/" element={<Login/>}/> 
       <Route path="/Dashboard" element={<Dashboard/>}/> 
       <Route path="/Account" element={<Account/>}/> 


     </Routes>
     </> 
  );
}

export default App;
