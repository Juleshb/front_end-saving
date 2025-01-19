import Sidebar from './Sidebar'
import Navbar from './nav'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import * as XLSX from "xlsx";

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingup, setLoadingup] = useState(false);
  const [error, setError] = useState("");
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
    const fetchAccounts = async () => {
      try {
        const response = await axiosInstance.get("/accounts");
        setAccounts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch accounts.");
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

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

  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoadingup(true); 
    try {
      const response = await axiosInstance.post("/accounts/batch-deposit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      alert("Failed to process batch deposits.");
    } finally {
      setLoadingup(false); 
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
<>
<Sidebar />
<div className="relative md:ml-64 bg-blueGray-100">
<Navbar />
<div className=" mt-20 flex">
        <div className=" w-full h-[100vh] bg-[#f5f7fa]">

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6">
      {/* Card 1 - My Balance */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="text-5xl text-yellow-500 bg-yellow-100 p-4 rounded-full"><Icon icon="qlementine-icons:money-16" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Balance</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 0.00</p>
        </div>
      </div>

      {/* Card 2 - Income */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-purple-500 bg-purple-100 p-4 rounded-full"><Icon icon="game-icons:take-my-money" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Income</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 0.00</p>
        </div>
      </div>

      {/* Card 3 - Expense */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-pink-500 bg-pink-100 p-4 rounded-full"><Icon icon="game-icons:pay-money" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Expense</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 0.00</p>
        </div>
      </div>

      {/* Card 4 - Total Saving */}
      <div className="p-6 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-5xl text-teal-500 bg-teal-100 p-4 rounded-full"><Icon icon="solar:wallet-money-outline" width="32" height="32" /></div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">Total Saving</h3>
          <p className="text-2xl font-semibold text-gray-800">Frw 0.00</p>
        </div>
      </div>
    </div>

          <div className="p-6">
     
      <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
          >
            Export Excel Format
          </button>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">Batch Deposit Upload</h1>
      <div className="relative">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          disabled={loading}
          className={`w-full mb-4 px-3 py-2 border rounded ${
            loading ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <svg
              className="animate-spin h-6 w-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.137.835 4.085 2.209 5.576l1.791-1.285z"
              ></path>
            </svg>
          </div>
        )}
      </div>
  
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 text-left">Names</th>
            <th className="py-3 px-6 text-left">NID</th>
            <th className="py-3 px-6 text-left">Account Number</th>
            <th className="py-3 px-6 text-left">Balance</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.account_id} className="hover:bg-gray-100">
              <td className="py-3 px-6">{account.name}</td>
              <td className="py-3 px-6">{account.identification_number}</td>
              <td className="py-3 px-6">{account.accountnumber}</td>
              <td className="py-3 px-6">Frw{account.balance}</td>
              <td className="py-3 px-6 flex gap-2">
                <button
                  onClick={() => handleModal("update", account)}
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-indigo-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleModal("deposit", account)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Deposit
                </button>
                <button
                  onClick={() => handleModal("withdraw", account)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Withdraw
                </button>
                <button
                  onClick={() => handleDelete(account.account_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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