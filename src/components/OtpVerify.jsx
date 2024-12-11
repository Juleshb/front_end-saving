import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OtpVerify() {
  const [otp,setOtp]=useState("");
  const [emailOrPhone, setEmail] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (event) =>{
    event.preventDefault();

    const OtpVerify = {
      emailOrPhone: emailOrPhone,
      otp: otp
    };
    try{
      const response = await axios.post(
        "http://localhost:9000/api/users/confirm-login",OtpVerify);

        if(response.status == 200){
          setSuccessMessage("OTP verified successfully");
          setShowSuccessMessage(true);
          setShowFailureMessage(false);

        }else{
          setErrorMessage("Invalid or expired OTP");
          setShowSuccessMessage(false);
          setShowFailureMessage(true);
        }
    }
    catch(error){
      console.error(error)
      setErrorMessage("Invalid or expired OTP");
      setShowSuccessMessage(false);
      setShowFailureMessage(true);
    }

  }
  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const closeFailureMessage = () => {
    setShowFailureMessage(false);
  };


  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-grey-100   flex justify-center flex-1">
          <div className=" xl:w-5/12 p-6 sm:p-12 bg-white shadow-md rounded-md">
          <div className="my-12 border-b text-center">
                 
                </div>
            <div className="flex flex-col items-center ">
              <h1 className="text-2xl xl:text-3xl ">Login</h1>
              {showSuccessMessage && (
                    <div className="border-dotted px-4 py-3 border-2 border-green-500 text-sm text-green-700 bg-green-100 text-center flex justify-between mt-4">
                      <p className="items-center flex">{SuccessMessage}</p>
                      <button onClick={closeSuccessMessage}>Close</button>
                    </div>
                  )}

                  {showFailureMessage && (
                    <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 bg-red-100 text-center flex justify-between mt-4">
                      <p className="items-center flex">{errorMessage}</p>
                      <button onClick={closeFailureMessage}>Close</button>
                    </div>
                  )}

              <div className="w-full flex-1 mt-8">
               

                <div className="mx-auto text-center">
                  <p className=' text-green-600 mb-5'>OTP sent to your email. Please confirm to proceed</p>
              
              <form onSubmit={handleSubmit}>

              <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={emailOrPhone}
                      onChange={(e) => setEmail(e.target.value)}
                    />
            
                <input
                    className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Verify OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  
                  <button className="mt-5 mb-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">Continue</span>
                  </button> 
               </form>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;
