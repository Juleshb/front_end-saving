import React, { useState } from "react";
import axios from "axios";
import Logo from "./assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    identification_number: "",
    date_of_birth: "",
    place_of_birth: "",
    residence_place: "",
    telephone: "",
    address: "",
    position: "",
    place_of_working: "",
    marital_status: "",
    spouse_name: "",
    spouse_id_number: "",
    spouse_telephone: "",
    shares: "",
    monthly_saving: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/users/register", formData);

      if (response.status === 201) {
        setSuccessMessage("Registration successful! check your Email");
        setErrorMessage("");
        navigate("/");
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://kasisto.com/wp-content/uploads/2023/03/KAS230218-February-Blog-i.02-1200x712.jpg')",
      }}
    ></div>
    <div className="absolute inset-0  opacity-50"></div>

    <div className="relative max-w-md w-full bg-white opacity-70 shadow-lg rounded-lg p-6">
         <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
           <img
             src={Logo}
             alt="Logo"
             className="h-20 w-20 rounded-full border-4 border-white shadow-md"
           />
         </div>
            <h1 className="text-2xl xl:text-3xl">Registration</h1>
        
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
              {step === 1 && (
                <>
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="identification_number"
                    placeholder="Identification Number"
                    value={formData.identification_number}
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    required
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                  >
                    Next
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="date"
                    name="date_of_birth"
                    placeholder="Date of Birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="place_of_birth"
                    placeholder="Place of Birth"
                    value={formData.place_of_birth}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="residence_place"
                    placeholder="Residence Place"
                    value={formData.residence_place}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="telephone"
                    placeholder="Telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="mt-5 tracking-wide font-semibold bg-gray-300 text-gray-900 w-full py-4 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                  >
                    Next
                  </button>
                </>
              )}
              {step === 3 && (
                <>
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="spouse_name"
                    placeholder="Spouse Name"
                    value={formData.spouse_name}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="spouse_id_number"
                    placeholder="Spouse ID Number"
                    value={formData.spouse_id_number}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="spouse_telephone"
                    placeholder="Spouse Telephone"
                    value={formData.spouse_telephone}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="number"
                    name="shares"
                    placeholder="Shares"
                    value={formData.shares}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full px-8 py-4 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="number"
                    name="monthly_saving"
                    placeholder="Monthly Saving"
                    value={formData.monthly_saving}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="mt-5 tracking-wide font-semibold bg-gray-300 text-gray-900 w-full py-4 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out"
                  >
                    Submit
                  </button>
                </>
              )}
            </form>
            <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login up here
            </Link>
          </p>
        </div>
          </div>
        </div>
      </div>
  );
};

export default Registration;
