import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [emailOrPhone, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowButton(false);
    setShowLoader(true);
    const logindata = {
      emailOrPhone: emailOrPhone,
      password: password
    };  
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/login",
        logindata
      );
      const { token } = response.data;
      console.log(response.data);

      if (response.status === 200 && token) {
        setAuthData({ token });
        localStorage.setItem("token", token);

        setShowButton(true);
        setShowLoader(false);

        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setSuccessMessage("You have logged in successfully!");

       
      } else {
        console.error("Login failed:", response.data.message);
         setShowSuccessMessage(true);
        setSuccessMessage("OTP sent to your email. Please confirm to proceed}");
        navigate("/OtpVerify");

      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("User not found. Please check your email.");
        } else if (error.response.status === 400) {
          setErrorMessage("Invalid credentials. Please check your password.");
        } else {
          setErrorMessage("Failed to login. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }

      console.error("Login error:", error);
      setShowFailureMessage(true);
      setShowSuccessMessage(false);
    }
  };

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
            <div></div>
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl ">Login</h1>
              <div className="w-full flex-1 mt-8">
             

                <div className="my-12 border-b text-center">
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
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={emailOrPhone}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="mt-5 mb-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <span className="ml-3">Login</span>
                    </button>
                    <Link
                      className=" mt-2 hover:underline hover:text-blue-600"
                      to="/Signup"
                    >
                      Create account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
