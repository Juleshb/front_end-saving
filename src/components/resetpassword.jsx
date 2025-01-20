import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import Logo from "./assets/logo.png";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const phoneNumber = '+250792445913';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Unauthorized access. Please log in again.");
        return;
      }

      const response = await fetch("https://umuhuza.store/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
 <div className="relative min-h-screen flex items-center justify-center">
        <a
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-4 animate-bounce flex justify-between right-4 bg-green-500 text-3xl hover:bg-green-600 text-white py-2 px-4 p-6 rounded-full z-10"
                  >
                 <p className="text-sm m-2 sm:hidden ">Contact our support team</p>  <Icon icon="akar-icons:whatsapp-fill" />
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

            <h1 className="text-xl font-bold animate-pulse text-center text-primary mt-6 mb-6">Reset Password</h1>
          
          <div className="flex flex-col items-center">
            {successMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-green-500 text-sm text-green-700 bg-green-100 text-center flex justify-between mt-4">
                <p>{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 bg-red-100 text-center flex justify-between mt-4">
                <p>{errorMessage}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="w-full mt-8">
              <input
                className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                className="w-full px-8 py-4 mb-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="submit"
                className="mt-5 mb-3 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
              >
                Reset Password
              </button>
            </form>
            </div>
          </div>
        </div>
      
  );
};

export default ResetPassword;
