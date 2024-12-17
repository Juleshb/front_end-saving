import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Admin/Sidebar";
import Navbar from "./nav";

function Dashboard() {
  return (
    <>
     <Sidebar />
     <div className="relative md:ml-64 bg-blueGray-100">
     <Navbar/>
      <div className="mt-20 flex">
       

        <div className=" w-full h-[100vh] bg-[#f5f7fa]">

          <div className=" w-full flex flex-cal lg:flex-row justify-around mt-10 mb-10">
         
         
         {/* Statistic section */}
            <div className="w-3/5">
            <p className=" text-5xl">Statistic section</p>
            </div>

            <div className=" w-[30%]  bg-white rounded-2xl ">
              <div className=" p-2 bg-white rounded-2xl  w-72 flex text-center  ">
                <svg
                  fill="#396AFF"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="50px"
                  className=" mt-3 ml-4 bg-[#f5f7fa] rounded-full p-2"
                  height="50px"
                  viewBox="0 0 45.532 45.532"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z" />{" "}
                    </g>{" "}
                  </g>
                </svg>
                <div className=" mt-2 text-lg ml-4">
                  <p className=" text-slate-600 text-lg text-center ">
                    Total customers{" "}
                  </p>
                  <p className=" text-2xl">21</p>
                </div>
              </div>
              <div className=" p-2 bg-white rounded-2xl  w-72 flex text-center  ">
                <svg
                  version="1.0"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="50px"
                  className=" mt-3 ml-4 bg-[#f5f7fa] rounded-full p-2"
                  height="50px"
                  viewBox="0 0 64 64"
                  enable-background="new 0 0 64 64"
                  xml:space="preserve"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path
                        fill="#ffc800"
                        d="M60,58c0-2.209-1.791-4-4-4h-2V25h6c1.795,0,3.369-1.194,3.852-2.922c0.484-1.728-0.242-3.566-1.775-4.497 l-28-17C33.439,0.193,32.719,0,32,0s-1.438,0.193-2.076,0.581l-28,17c-1.533,0.931-2.26,2.77-1.775,4.497 C0.632,23.806,2.207,25,4,25h6v29H8c-2.209,0-4,1.791-4,4c-2.209,0-4,1.791-4,4v2h64v-2C64,59.791,62.209,58,60,58z M52,54h-4V25h4 V54z M18,25h4v29h-4V25z M24,25h4v29h-4V25z M30,25h4v29h-4V25z M36,25h4v29h-4V25z M42,25h4v29h-4V25z M4,23 c-0.893,0-1.685-0.601-1.926-1.462c-0.241-0.859,0.124-1.784,0.888-2.247l28-17.001C31.275,2.1,31.635,2,32,2 c0.367,0,0.725,0.1,1.039,0.291l28,17c0.764,0.463,1.129,1.388,0.887,2.248C61.686,22.399,60.893,23,60,23H4z M12,25h4v29h-4V25z M8,56h48c1.105,0,2,0.896,2,2H6C6,56.896,6.896,56,8,56z M2,62c0-1.104,0.896-2,2-2h56c1.105,0,2,0.896,2,2H2z"
                      />{" "}
                      <path
                        fill="#ffc800"
                        d="M32,9c-2.762,0-5,2.238-5,5s2.238,5,5,5s5-2.238,5-5S34.762,9,32,9z M32,17c-1.656,0-3-1.343-3-3 s1.344-3,3-3c1.658,0,3,1.343,3,3S33.658,17,32,17z"
                      />{" "}
                    </g>{" "}
                  </g>
                </svg>
                <div className=" mt-2 text-lg ml-4">
                  <p className=" text-slate-600 text-lg text-center ">
                    Total Transation{" "}
                  </p>
                  <p className=" text-2xl">210,000 Frw</p>
                </div>
              </div>
              <div className=" p-2 bg-white rounded-2xl  w-72 flex text-center  ">
                <svg
                  fill="#b77b7b"
                  width="50px"
                  className=" mt-3 ml-4 bg-[#f5f7fa] rounded-full p-2"
                  height="50px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path d="M4,23a1,1,0,0,1-1-1V19a1,1,0,0,1,2,0v3A1,1,0,0,1,4,23Zm9-1V15a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Zm7-11a1,1,0,0,0-1,1V22a1,1,0,0,0,2,0V12A1,1,0,0,0,20,11Zm.382-9.923A.991.991,0,0,0,20,1H16a1,1,0,0,0,0,2h1.586L12,8.586,8.707,5.293a1,1,0,0,0-1.414,0l-4,4a1,1,0,0,0,1.414,1.414L8,7.414l3.293,3.293a1,1,0,0,0,1.414,0L19,4.414V6a1,1,0,0,0,2,0V2a1,1,0,0,0-.618-.923Z" />
                  </g>
                </svg>
                <div className=" mt-2 text-lg ml-4">
                  <p className=" text-slate-600 text-lg text-center ">
                    Total Amount
                  </p>
                  <p className=" text-2xl">2,000,000 Frw</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full  align-middle flex justify-center items-center ">
                <div className="overflow-hidden bg-white lg:w-11/12 rounded-xl ">
                  <p className=" text-xl font-semibold ml-5 text-slate-500 mt-4">
                    Active Loans Overview
                  </p>
                  <table className="min-w-full divide-y  divide-gray-200 ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase "
                        >
Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase "
                        >
Transaction ID                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase "
                        >
                          Address
                        </th>
                        
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase "
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase "
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-medium text-gray-500 uppercase "
                        >
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    
                      <tr className="hover:bg-gray-100  border border-l-0 border-r-0 border-t-0">
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800 ">
                          Kenny Eddy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                        #12548796                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          Musanze
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          133,000 Frw
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          12/01/2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          <button className=" p-2 w-44 rounded-full border-blue-600 border-2"> Download</button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-100  border border-l-0 border-r-0 border-t-0">
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800 ">
                          Kenny Eddy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                        #12548796                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          Musanze
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          133,000 Frw
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          12/01/2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          <button className=" p-2 w-44 rounded-full border-blue-600 border-2"> Download</button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-100  border border-l-0 border-r-0 border-t-0">
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800 ">
                          Kenny Eddy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                        #12548796                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          Musanze
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          133,000 Frw
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          12/01/2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          <button className=" p-2 w-44 rounded-full border-blue-600 border-2"> Download</button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-100  border border-l-0 border-r-0 border-t-0">
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800 ">
                          Kenny Eddy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                        #12548796                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          Musanze
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          133,000 Frw
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          12/01/2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          <button className=" p-2 w-44 rounded-full border-blue-600 border-2"> Download</button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-100  border border-l-0 border-r-0 border-t-0">
                        <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-800 ">
                          Kenny Eddy
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                        #12548796                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          Musanze
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          133,000 Frw
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          12/01/2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-800 ">
                          <button className=" p-2 w-44 rounded-full border-blue-600 border-2"> Download</button>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
