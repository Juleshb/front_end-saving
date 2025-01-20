import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";
import Navbar from "./nav";
import CombinedChart from "./Chart";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "https://umuhuza.store/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await axiosInstance.get("/transactions/userbalance");
        // const loanResponse = await axios.get(`/api/loans/${userId}`);
        // const savingsResponse = await axios.get(`/api/savings/${userId}`);
        // const transactionsResponse = await axios.get(`/api/transactions/chart/${userId}`);
        
        setBalance(balanceResponse.data.total_transactions);
        // setLoan(loanResponse.data.loans);
        // setSavings(savingsResponse.data.savings);
        // setChartData(transactionsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, );
  return (
    <>
     <Sidebar />
     <div className="relative md:ml-64 bg-blueGray-100">
     <Navbar/>
     <div className="grid grid-cols-1 sm:mt-10 mt-20 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6">
      {/* Card 1 - My Balance */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="text-5xl text-yellow-500 bg-yellow-100 p-4 rounded-full"><Icon icon="qlementine-icons:money-16" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Total saving</h3>
          {/* <p className="text-2xl sm:text-lg font-semibold text-gray-800">Frw {balance}</p> */}
          <p className="text-2xl sm:text-lg font-semibold text-gray-800">Pending..</p>
        </div>
      </div>

      {/* Card 2 - Income */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-purple-500 bg-purple-100 p-4 rounded-full"><Icon icon="game-icons:take-my-money" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">My loan</h3>
          <p className="text-2xl sm:text-lg font-semibold text-gray-800">Pending..</p>
        </div>
      </div>

      {/* Card 3 - Expense */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-pink-500 bg-pink-100 p-4 rounded-full"><Icon icon="game-icons:pay-money" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Unpaired loan</h3>
          <p className="text-2xl sm:text-lg font-semibold text-gray-800">Pending..</p>
        </div>
      </div>

    </div>
      <div className="mt-6flex">
       

        <div className="flex w-full h-[100vh] ">

         
            <div className="w-full">
            <CombinedChart />
            </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
