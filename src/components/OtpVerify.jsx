import React from 'react';
import { Link } from 'react-router-dom';

function OtpVerify() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-grey-100   flex justify-center flex-1">
          <div className=" xl:w-5/12 p-6 sm:p-12 bg-white shadow-md rounded-md">
            <div>
              
            </div>
            <div className="flex flex-col items-center mt-36">
              <h1 className="text-2xl xl:text-3xl ">Login</h1>
              <div className="w-full flex-1 mt-8">
               

                <div className="mx-auto max-w-xs">
                  <p>Verify OTP sent to your email</p>
                <input
                    className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Verify OTP"
                  />

                  
                  <button className="mt-5 mb-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">Continue</span>
                  </button> 

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
