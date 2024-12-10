import { Route,Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/Login";
function App() {
  return (
    <>
     <Routes>      
       <Route path="/Signup" element={<Signup/>}/> 
       <Route path="/" element={<Login/>}/> 
     </Routes>
     </> 
  );
}

export default App;
