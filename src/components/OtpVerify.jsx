import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for OTP digits
  const [email, setEmail] = useState(""); // Email fetched from localStorage
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  // Fetch email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Handle OTP digit change
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only one character per input
    setOtp(newOtp);

    // Automatically move to the next input if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace for navigation between inputs
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return; // Ensure only numeric data is pasted

    const newOtp = pastedData.slice(0, 6).split(""); // Limit to 6 digits
    const filledOtp = [...otp];
    newOtp.forEach((digit, index) => {
      filledOtp[index] = digit;
    });
    setOtp(filledOtp);

    // Focus on the next empty input (if any)
    const nextEmptyIndex = newOtp.length < 6 ? newOtp.length : 5;
    document.getElementById(`otp-${nextEmptyIndex}`).focus();
  };

  // Handle OTP submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpValue = otp.join(""); // Combine OTP digits into a single string

    const OtpVerify = {
      emailOrPhone: email,
      otp: otpValue,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/confirm-login",
        OtpVerify
      );

      if (response.status === 200) {
        const data = response.data;

        if (data.firstTimeLogin) {
          // Store the token and navigate to the reset password page
          localStorage.setItem("token", data.token);
          navigate("/reset-password");
        } else {
          setSuccessMessage("OTP verified successfully");
          setShowSuccessMessage(true);
          setShowFailureMessage(false);

          // Save token to localStorage
          localStorage.setItem("token", data.token);

          // Redirect to the dashboard or next step
          navigate("/dashboard");
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
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-grey-100 flex justify-center flex-1">
          <div className="xl:w-5/12 p-6 sm:p-12 bg-white shadow-md rounded-md">
            <div className="my-12 border-b text-center"></div>
            <div className="flex flex-col items-center">
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
                    {/* Display Email */}
                    <input
                      className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      value={email}
                      readOnly
                    />

                    {/* OTP Inputs */}
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
                          onPaste={index === 0 ? handlePaste : undefined} // Attach paste handler to the first input
                          className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-100"
                        />
                      ))}
                    </div>

                    {/* Submit Button */}
                    <button className="mt-5 mb-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <span className="ml-3">Verify OTP</span>
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
