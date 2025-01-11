import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";
import Navbar from "./nav";
import CombinedChart from "./Chart";
import TransactionPieChart from "./Piechart";
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
     <div className="grid grid-cols-1 mt-20 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6">
      {/* Card 1 - My Balance */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="text-5xl text-yellow-500 bg-yellow-100 p-4 rounded-full"><Icon icon="qlementine-icons:money-16" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Balance</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw {balance}</p>
        </div>
      </div>

      {/* Card 2 - Income */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-purple-500 bg-purple-100 p-4 rounded-full"><Icon icon="game-icons:take-my-money" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Income</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 5,600</p>
        </div>
      </div>

      {/* Card 3 - Expense */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-pink-500 bg-pink-100 p-4 rounded-full"><Icon icon="game-icons:pay-money" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Expense</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 3,460</p>
        </div>
      </div>

      {/* Card 4 - Total Saving */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-teal-500 bg-teal-100 p-4 rounded-full"><Icon icon="solar:wallet-money-outline" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Total Saving</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 7,920</p>
        </div>
      </div>
    </div>
      <div className="mt-6flex">
       

        <div className="flex w-full h-[100vh] ">

         
            <div className="w-full">
            <CombinedChart />
            </div>
            <TransactionPieChart />

        </div>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
