import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "./assets/logo.png";
import { AuthContext } from "./authocontex"; // Import AuthContext

function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { setAuthData } = useContext(AuthContext); // Use AuthContext

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.slice(0, 6).split("");
    const filledOtp = [...otp];
    newOtp.forEach((digit, index) => {
      filledOtp[index] = digit;
    });
    setOtp(filledOtp);

    const nextEmptyIndex = newOtp.length < 6 ? newOtp.length : 5;
    document.getElementById(`otp-${nextEmptyIndex}`).focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpValue = otp.join("");
    const OtpVerify = {
      emailOrPhone: email,
      otp: otpValue,
    };

    try {
      const response = await axios.post(
        "https://umuhuza.store/api/users/confirm-login",
        OtpVerify
      );

      if (response.status === 200) {
        const { token, role, firstTimeLogin } = response.data;

        // Update context with token and role
        setAuthData({ token, role });
         localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (firstTimeLogin) {
          navigate("/reset-password");
        } else {
          setSuccessMessage("OTP verified successfully");
          setShowSuccessMessage(true);
          setShowFailureMessage(false);

          // Navigate based on role
          if (role === "admin") {
            navigate("/dashboard");
          } else if (role === "user") {
            navigate("/userdashboard");
          } else {
            navigate("/unauthorized");
          }
        }
      } else {
        setErrorMessage("Invalid or expired OTP");
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid or expired OTP");
      setShowSuccessMessage(false);
      setShowFailureMessage(true);
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
      <div className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://kasisto.com/wp-content/uploads/2023/03/KAS230218-February-Blog-i.02-1200x712.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 opacity-50"></div>

        <div className="relative max-w-md w-full bg-white opacity-70 shadow-lg rounded-lg p-6">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <img
              src={Logo}
              alt="Logo"
              className="h-20 w-20 rounded-full border-4 border-white shadow-md"
            />
          </div>

          <h1 className="text-2xl xl:text-3xl">Verify OTP</h1>
          {showSuccessMessage && (
            <div className="border-dotted px-4 py-3 border-2 border-green-500 text-sm text-green-700 bg-green-100 text-center flex justify-between mt-4">
              <p className="items-center flex">{successMessage}</p>
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
              <p className="text-green-600 mb-5">
                OTP sent to your email "{email}". Please confirm to proceed.
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  value={email}
                  readOnly
                />

                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-100"
                    />
                  ))}
                </div>

                <button className="mt-5 mb-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-3">Verify OTP</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;
