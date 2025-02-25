import Sidebar from './Sidebar'
import Navbar from './nav'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../assets/logo.png";


function Account() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const [formData, setFormData] = useState({
    user_id: "",
    balance: "",
    amount: "",
    description: "",
  });

  const token = localStorage.getItem("token"); 
  const axiosInstance = axios.create({
    baseURL: "https://umuhuza.store/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchAccounts();
}, []);

const fetchAccounts = async () => {
    try {
        const response = await axiosInstance.get("/accounts");
        setAccounts(response.data);
        setFilteredUsers(response.data); 
        setLoading(false);
    } catch (error) {
        toast.error("Failed to fetch accounts.");
        setLoading(false);
    }
};

const handleSearch = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  const filtered = accounts.filter(
    (account) =>
      account.name.toLowerCase().includes(query) ||
      account.email.toLowerCase().includes(query)
  );

  setFilteredUsers(filtered);
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModal = (type, account = null) => {
    setModalType(type);
    setSelectedAccount(account);
    setFormData({
      user_id: account?.user_id || "",
      balance: account?.balance || "",
      amount: "",
      description: "",
    });
    setShowModal(true);
  };

  
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
        setSelectedFile(file);
        toast.success(`Selected file: ${file.name}`);
    } else {
        toast.error("Invalid file type. Please upload an Excel file (.xls or .xlsx). ");
    }
};

const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx,.xls",
});

const handleUploadClick = () => {
    if (selectedFile) {
        handleFileUpload(selectedFile);
    } else {
        toast.error("Please select a file before uploading.");
    }
};

const handleFileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(0);
    try {
        await axiosInstance.post("/accounts/batch-deposit", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
            },
        });
        toast.success("Batch deposit processed successfully.");
        setSelectedFile(null);
        fetchAccounts();
    } catch (error) {
        toast.error("Failed to process batch deposits.");
    } finally {
        setUploading(false);
    }
};

  const handleExport = () => {
    if (accounts.length === 0) {
      alert("No data to export!");
      return;
    }

    const transformedData = accounts.map((account) => ({
      account_id: account.account_id,
      accountnumber: account.accountnumber,
      name: account.name,
      email: account.email,
      balance: account.balance,
      amount: "", 
      description: "", 
    }));

    const now = new Date();
    const formattedDate = now.toISOString().replace(/T/, " ").replace(/:/g, "-").split(".")[0]; 
    const sheetName = `cepedhu ${formattedDate}`;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); 
    XLSX.writeFile(workbook, `cepedhu_${formattedDate}.xlsx`);
  };
  
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/accounts/${selectedAccount.account_id}`, {
        balance: formData.balance,
      });
      setAccounts(
        accounts.map((account) =>
          account.account_id === selectedAccount.account_id
            ? { ...account, balance: formData.balance }
            : account
        )
      );
      setShowModal(false);
      alert("Account updated successfully.");
    } catch (error) {
      alert("Failed to update account.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await axiosInstance.delete(`/accounts/${id}`);
        setAccounts(accounts.filter((account) => account.account_id !== id));
        alert("Account deleted successfully.");
      } catch (error) {
        alert("Failed to delete account.");
      }
    }
  };

  const handleDeposit = async () => {
    try {
      await axiosInstance.post(`/accounts/${selectedAccount.account_id}/deposit`, {
        amount: formData.amount,
        description: formData.description,
      });
      setShowModal(false);
      alert("Deposit successful.");
    } catch (error) {
      alert("Failed to deposit.");
    }
  };

  const handleWithdraw = async () => {
    try {
      await axiosInstance.post(`/accounts/${selectedAccount.account_id}/withdraw`, {
        amount: formData.amount,
        description: formData.description,
      });
      setShowModal(false);
      alert("Withdrawal successful.");
    } catch (error) {
      alert("Failed to withdraw.");
    }
  };

  if (loading) return(
    <div className="flex bg-primary justify-center items-center h-screen">
    <motion.img 
        src={Logo}
        alt="Loading..." 
        className="h-36"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
  );
  if (error) return <p>{error}</p>;

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
<>
<Sidebar />
<div className="relative md:ml-64 bg-blueGray-100">
<Navbar />
<div className="flex">
        <div className=" w-full h-[100vh] bg-[#f5f7fa]">

  <div className="grid grid-cols-1 mt-20 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6">
       {/* Card 1 - My Balance */}
       <div className="p-6 rounded-lg shadow-md flex items-center justify-between">
         <div className="text-5xl text-yellow-500 bg-yellow-100 p-4 rounded-full"><Icon icon="qlementine-icons:money-16" width="32" height="32" /></div>
         <div>
           <h3 className="text-gray-500 text-sm font-medium">Balance</h3>
           <p className="text-sm font-semibold text-gray-800">Frw 0.00</p>
         </div>
       </div>
 
       {/* Card 2 - Income */}
       <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
         <div className="text-5xl text-purple-500 bg-purple-100 p-4 rounded-full"><Icon icon="game-icons:take-my-money" width="32" height="32" /></div>
         <div>
           <h3 className="text-gray-500 text-sm font-medium">Income</h3>
           <p className="text-sm font-semibold text-gray-800">Frw 0.00</p>
         </div>
       </div>
 
       {/* Card 3 - Expense */}
       <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
         <div className="text-5xl text-pink-500 bg-pink-100 p-4 rounded-full"><Icon icon="game-icons:pay-money" width="32" height="32" /></div>
         <div>
           <h3 className="text-gray-500 text-sm font-medium">Expense</h3>
           <p className="text-sm font-semibold text-gray-800">Frw 0.00</p>
         </div>
       </div>
 
       {/* Card 4 - Total Saving */}
       <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
         <div className="text-5xl text-teal-500 bg-teal-100 p-4 rounded-full"><Icon icon="solar:wallet-money-outline" width="32" height="32" /></div>
         <div>
           <h3 className="text-gray-500 text-sm font-medium">Total Saving</h3>
           <p className="text-sm font-semibold text-gray-800">Frw 0.00</p>
         </div>
       </div>
     </div>

          <div className="p-6">
          <div className="container mb-4 mx-auto  p-8 border border-gray-200 ">
          <div className="flex justify-between items-center mb-4">
          <h1 className="text-xs font-semibold text-gray-700 mb-4">Batch Deposit Upload</h1>
          <button 
                      onClick={handleExport}
                          className="flex items-center justify-center text-xs space-x-2 border-2 border-green-400 text-green-400 p-2 rounded-md hover:bg-green-400 hover:text-white transition"
                      ><Icon icon="mdi:file-excel-outline" width="24" height="24" /> <span>Export Excel Format</span>    
                      </button>
          </div>

           <Toaster position="top-center" reverseOrder={false} />
                      <motion.div 
                                    {...getRootProps()} 
                                    className="mb-4 flex flex-col items-center text-xs h-36 content-center p-4 bg-green-100 border-2 border-dotted border-primary rounded-md cursor-pointer hover:bg-gray-100 transition"
                                    whileHover={{ scale: 1.05 }}
                                >
                        <input {...getInputProps()} />
                        <p className='justify-items-center  text-green-400'> <Icon icon="mdi:file-excel-outline" width="24" height="24" /> {selectedFile ? `${selectedFile.name}` : "Drag & drop a file here, or click to select one"} </p>
                    </motion.div>
                    <div className="mb-4">
                        {uploading && (
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }}></div>
                            </div>
                        )}
                    </div>

                    <button 
                                    onClick={handleUploadClick} 
                                    disabled={uploading}
                                    className="flex items-center justify-center text-xs space-x-2 border-2 border-primary text-primary p-2 rounded-md hover:bg-primary hover:text-white transition"
                                >
                                    {uploading ? (
                                        <>
                                            <Icon icon="line-md:loading-loop" width="16" height="16" />
                                            <span>Uploading... {progress}%</span>
                                        </>
                                    ) : (
                                        <>
                                            <Icon icon="line-md:cloud-alt-upload-loop" width="24" height="24" />
                                            <span>Upload</span>
                                        </>
                                    )}
                                </button>
                    </div>
                    <div className="flex justify-between items-center p-4">
          <h1 className="text-sm font-bold">Accounts</h1>
          <input
            type="text"
            placeholder="Search by Name, Email, or Acc number"
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/3 px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-primary"
          />
        </div>
  <div className="justify-items-center">
      <table className="min-w-full bg-white border border-primary text-xs">
        <thead className='text-xs border border-primary  text-gray-500 bg-gray-50'>
          <tr className="">
            <th className="py-3 px-6 text-left">Names</th>
            <th className="py-3 px-6 text-left">NID</th>
            <th className="py-3 px-6 text-left">Account Number</th>
            <th className="py-3 px-6 text-left">Balance</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className='text-gray-600 text-xs font-light'>
        {currentUsers.length > 0 ? (
          currentUsers.map((account) => (
            <tr key={account.account_id} className=" hover:bg-primary hover:text-white">
              <td className="py-3 px-6">{account.name}</td>
              <td className="py-3 px-6">{account.identification_number}</td>
              <td className="py-3 px-6">{account.accountnumber}</td>
              <td className="py-3 px-6">Frw{account.balance}</td>
              <td className="py-3 px-6 text-left flex gap-2 bg-green-100 border-l-2 border-primary">

                <button
                    onClick={() => handleModal("update", account)}
                  className="flex items-center justify-center text-xs space-x-2 border-2 border-primary text-primary p-2 rounded-md hover:bg-primary hover:text-white transition"
                >
                <Icon icon="cuida:edit-outline" width="16" height="16" /> <span>Edit</span>  
                
                </button>
                <button
                  onClick={() => handleModal("deposit", account)}
                  className="flex items-center justify-center text-xs space-x-2 border-2 border-green-400 text-green-400 p-2 rounded-md hover:bg-green-400 hover:text-white transition"
                >
                <Icon icon="hugeicons:money-add-02" width="16" height="16" /> <span>Deposit</span>  
                
                </button>
                <button
                  onClick={() => handleModal("withdraw", account)}
                  className="flex items-center justify-center text-xs space-x-2 border-2 border-yellow-500 text-yellow-500 p-2 rounded-md hover:bg-yellow-500 hover:text-white transition "
                >
                <Icon icon="hugeicons:money-exchange-01" width="16" height="16" /> <span>Withdraw</span>  
                 
                </button>

                <button
                  onClick={() => handleDelete(account.account_id)}
                  className="flex items-center justify-center text-xs space-x-2 border-2 border-red-500 text-red-500 p-2 rounded-md hover:bg-red-500 hover:text-white transition "
                >
                <Icon icon="weui:delete-on-outlined" width="16" height="16" /> <span>Delete</span>  
                 
                </button>
              </td>
            </tr>
          ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500 font-medium">
        No Account found matching your search.
      </td>
    </tr>
  )}
        </tbody>
      </table>

        <div className="flex justify-between  text-center mt-8 inline-flex items-center gap-3">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900">
                        <Icon icon="si:arrow-left-circle-line" width="24" height="24" />
                        </button>
                        <p className="text-xs text-gray-900">{currentPage} / {Math.ceil(filteredUsers.length / logsPerPage)}</p>
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers.length / logsPerPage)} className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900">
                        <Icon icon="si:arrow-right-circle-line" width="24" height="24" />
                        </button>
                      </div>
  </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
          <button
               onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <Icon icon="bx:x-circle" fontSize={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {modalType === "create" && "Create Account"}
              {modalType === "update" && "Update Account"}
              {modalType === "deposit" && "Deposit to Account"}
              {modalType === "withdraw" && "Withdraw from Account"}
            </h2>

            {modalType === "create" && (
              <>
                <input
                  name="user_id"
                  placeholder="User ID"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <input
                  name="balance"
                  placeholder="Initial Balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <button
                  onClick={handleCreate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </>
            )}

            {modalType === "update" && (
              <>
                <input
                  name="balance"
                  placeholder="Balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Update
                </button>
              </>
            )}

            {(modalType === "deposit" || modalType === "withdraw") && (
              <>
                <input
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border rounded"
                />
                <button
                  onClick={modalType === "deposit" ? handleDeposit : handleWithdraw}
                  className={`${
                    modalType === "deposit" ? "bg-green-500" : "bg-yellow-500"
                  } text-white px-4 py-2 rounded hover:opacity-80`}
                >
                  {modalType === "deposit" ? "Deposit" : "Withdraw"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
        </div>
      </div>   
    </div>
</>

  )
}

export default Account