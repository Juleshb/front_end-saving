import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./assets/logo.png";
import { Icon } from '@iconify/react';

function Login() {
  const [emailOrPhone, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const phoneNumber = '+250792445913';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoader(true);

    const loginData = {
      emailOrPhone: emailOrPhone,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://umuhuza.store/api/users/login",
        loginData
      );

      if (response.status === 200) {
        localStorage.setItem("email", emailOrPhone);

        setSuccessMessage("OTP sent to your email. Please confirm to proceed.");
        setShowSuccessMessage(true);
        setShowFailureMessage(false);

        navigate("/OtpVerify");
      }
    } catch (error) {
      setShowLoader(false);

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
    <div className="relative min-h-screen flex items-center justify-center">
    <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 animate-bounce flex justify-between right-4 bg-green-500 text-3xl hover:bg-green-600 text-white py-2 px-4 p-6 rounded-full z-10"
              >
             <p className="text-sm m-2 sm:hidden">Contact our support team</p>  <Icon icon="akar-icons:whatsapp-fill" />
              </a>
      <div
        className="absolute inset-0 bg-cover bg-center animate-pulse"
        style={{
          backgroundImage:
            "url('https://kasisto.com/wp-content/uploads/2023/03/KAS230218-February-Blog-i.02-1200x712.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black  opacity-30"></div>

      <div className="relative max-w-md border-t-2 border-primary w-full bg-white opacity-90 shadow-lg rounded-lg p-6">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src={Logo}
            alt="Logo"
            className="h-24 w-24 bg-white rounded-full border-t-2 border-r-2 border-l-2 border-primary shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mt-12 ">
          CEPEDHU
        </h1>
        <h1 className="text-base font-thin  text-center text-gray-600 ">
          (INDATIRWABAHIZI)
        </h1>

        <h1 className="text-xl font-bold animate-pulse text-center text-primary mt-6 mb-6">
          Welcome Back
        </h1>
       

         <h1 className="text-2xl flex justify-center animate-pulse font-bold  text-center text-green-600 m-2 ">
         <Icon icon="material-symbols-light:lock-person-outline" width="48" height="48" /></h1>

                     <p className="text-center italic text-gray-600 mb-8">
        Access your Account from Wherever you Happen to be!
        </p>

        {showSuccessMessage && (
          <div className="mb-4 border-l-4 border-green-500 bg-green-50 p-4 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {showFailureMessage && (
          <div className="mb-4 border-l-4 border-red-500 bg-red-50 p-4 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="emailOrPhone"
              className=" text-gray-700"
            >
              Email or Phone
            </label>
            <input
              id="emailOrPhone"
              type="text"
              placeholder="Enter your email or phone"
              value={emailOrPhone}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary text-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {showLoader ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
