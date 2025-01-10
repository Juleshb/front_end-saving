import { useState } from 'react';
import { Icon } from '@iconify/react';
import LoanManagement from './loanmanagement';
import LoanApply from './applyloan';
import LoanRepayment from './LoanRepayment';
import Sidebar from './Sidebar'
import Navbar from "./nav";
function LoanTabs() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
    <Sidebar />
    <div className="relative md:ml-64 bg-blueGray-100">
    <Navbar/>
    <div className="relative md:pt-32 pb-32 pt-10"> 
      </div>
        <div className="px-4 md:px-10 mx-auto w-full m-2">
    <div className="relative flex flex-col min-w-0 break-words w-full  border border-primary">
      <div className="items-center flex flex-wrap justify-center bg-primary text-white w-full h-auto space-x-4 ">

        <button
          className={`px-4 items-center mt-2 mb-2 rounded-lg text-xs flex  py-3 block ${
            activeTab === 1
              ? 'bg-white text-primary '
              : ''
          }`}
          onClick={() => handleTabClick(1)}
        >
            <i className='mr-2'><Icon icon="zondicons:add-outline" /></i>
            Loan Management
        </button>
        <button
          className={`px-4 items-center mt-2 mb-2 rounded-lg text-xs flex  py-3 block ${
            activeTab === 2
            ? 'bg-white text-primary'
            : ''
          }`}
          onClick={() => handleTabClick(2)}
        >
            
        <i className='mr-2'><Icon icon="el:list-alt" /></i>
        Apply Loan
        </button>

        <button
          className={`px-4 items-center mt-2 mb-2 rounded-lg text-xs flex  py-3 block ${
            activeTab === 3
            ? 'bg-white text-primary'
            : ''
          }`}
          onClick={() => handleTabClick(3)}
        >
            
        <i className='mr-2'><Icon icon="el:list-alt" /></i>
        Loan Repayment
        </button>
       
      </div>
      <div className="mt-4">
        {activeTab === 1 && (
          <div className="bg-white  rounded-lg ">
            <LoanManagement/>
          
          </div>
        )}
        {activeTab === 2 && (
          <div className="bg-white p-4 rounded-lg ">
         <LoanApply/>
          </div>
        )}

        {activeTab === 3 && (
          <div className="bg-white p-4 rounded-lg ">
         <LoanRepayment/>
          </div>
        )}
 
      </div>
    </div>
    </div>
    </div>
</>
  );
}

export default LoanTabs;