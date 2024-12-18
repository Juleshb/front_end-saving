import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Sidebar from './Sidebar'
import Navbar from "./nav";

function Loans() {
    const [searchQuery, setSearchQuery] = useState(""); 
  
   
  return (
<>
<Sidebar />
<Navbar/>

      <div className="max-w-7xl mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden ml-72">
      <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">All Loans</h1>
          <input
            type="text"
            placeholder="Search by Name, Email, or NID..."
            value={searchQuery}
             className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
          <tbody className="text-gray-600 text-sm font-light">
 
        <tr   className="border-b border-gray-200 hover:bg-gray-100">
        <th className="py-3 px-6 text-left">Loan id</th>
        <th className="py-3 px-6 text-left">Name</th>
        <th className="py-3 px-6 text-left">Amount</th>
        <th className="py-3 px-6 text-left">Status</th>
        <th className="py-3 px-6 text-left capitalize">Repayment Period</th>
        <th className="py-3 px-6 text-left">
        </th>
        <th className="py-3 px-6 text-left flex gap-2">
          Action
        </th>
      </tr>
        <tr   className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left">#1242</td>
        <td className="py-3 px-6 text-left">Kenny</td>
        <td className="py-3 px-6 text-left">200,000 Frw</td>
        <td className="py-3 px-6 text-left">Pending</td>
        <td className="py-3 px-6 text-left capitalize">02/02/2025</td>
        <td className="py-3 px-6 text-left">
        </td>
        <td className="py-3 px-6 text-left flex gap-2">
          <button
            
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            <Icon icon="mdi:eye" width="24" height="24" />
          </button>
          <button
             className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
          >
            Approve
            {/* <Icon icon="la:edit" width="24" height="24" /> */}
           </button>
          <button
             className="bg-red-300 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Reject
            {/* <Icon icon="la:edit" width="24" height="24" /> */}
           </button>
        
        </td>
      </tr>
 
</tbody>
          </table>
        </div>
      </div>

</>

  )
}

export default Loans