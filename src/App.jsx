import { Route,Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/Login";
import OtpVerify from "./components/OtpVerify";
function App() {
  return (
    <>
     <Routes>      
       <Route path="/Signup" element={<Signup/>}/> 
       <Route path="/OtpVerify" element={<OtpVerify/>}/> 
       <Route path="/" element={<Login/>}/> 
     </Routes>
     </> 
  );
}

export default App;
