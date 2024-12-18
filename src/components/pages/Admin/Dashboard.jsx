import React from "react";
import { Icon } from "@iconify/react";
import Sidebar from "../Admin/Sidebar";
import Navbar from "./nav";
import CombinedChart from "./Chart";
import TransactionPieChart from "./Piechart";

function Dashboard() {
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
          <p className="text-2xl font-semibold text-gray-800">Frw 12,750</p>
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
