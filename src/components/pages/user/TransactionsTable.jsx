import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Sidebar from './Sidebar'
import Navbar from "./nav";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({
    account_id: "",
    transaction_type: "",
    amount: "",
    description: "",
  });
  const [accountId, setAccountId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [summary, setSummary] = useState(null);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "https://umuhuza.store/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("/transactions");
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModal = (type, transaction = null) => {
    setModalType(type);
    setSelectedTransaction(transaction);
    setFormData({
      account_id: transaction?.account_id || "",
      transaction_type: transaction?.transaction_type || "",
      amount: transaction?.amount || "",
      description: transaction?.description || "",
    });
    setShowModal(true);
  };

  const handleAddTransaction = async () => {
    try {
      await axiosInstance.post("/transactions", formData);
      alert("Transaction added successfully.");
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  const handleUpdateTransaction = async () => {
    try {
      await axiosInstance.put(`/transactions/${selectedTransaction.transaction_id}`, formData);
      alert("Transaction updated successfully.");
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating transaction:", error.message);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axiosInstance.delete(`/transactions/${id}`);
        alert("Transaction deleted successfully.");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting transaction:", error.message);
      }
    }
  };

  const handleFilterByAccount = async () => {
    try {
      const response = await axiosInstance.get(`/transactions/account/${accountId}`);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("Error filtering transactions:", error.message);
    }
  };

  const handleFilterByType = async () => {
    try {
      const response = await axiosInstance.get(`/transactions/type/${transactionType}`);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("Error filtering transactions:", error.message);
    }
  };

  const handleSummary = async () => {
    try {
      const response = await axiosInstance.get(`/transactions/summary/${accountId}`);
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error.message);
    }
  };

  return (
    <>
    <Sidebar />
    <div className="relative md:ml-64 bg-blueGray-100">
    <Navbar/>

      <div className="flex mt-20 m-6 gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <button onClick={handleFilterByAccount} className="bg-blue-500 text-white px-4 py-2 rounded">
          Filter by Account
        </button>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">Select Type</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
        <button onClick={handleFilterByType} className="bg-green-500 text-white px-4 py-2 rounded">
          Filter by Type
        </button>
        <button onClick={handleSummary} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Show Summary
        </button>
      </div>

      {summary && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Transaction Summary</h2>
          <p>Total Transactions: {summary.total_transactions}</p>
          <p>Total Amount: Frw {summary.total_amount}</p>
        </div>
      )}

<div className="overflow-x-auto m-6 mt-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-500 text-sm uppercase">
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Transaction ID</th>
            <th className="py-3 px-6 text-left">Account Number</th>
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Receipt</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 border-b">
              <td className="py-4 px-6 flex items-center">
                <Icon
                  icon={
                    transaction.transaction_type === "deposit"
                      ? "mdi:arrow-down-circle-outline"
                      : "mdi:arrow-up-circle-outline"
                  }
                  className={`mr-2 text-lg ${
                    transaction.transaction_type === "deposit" ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span className="text-gray-700">{transaction.description}</span>
              </td>

              <td className="py-4 px-6 text-blue-500 underline cursor-pointer">
                {transaction.transaction_id}
              </td>

              <td className="py-4 px-6 text-blue-500 underline cursor-pointer">
                {transaction.account_id}
              </td>

              <td className="py-4 px-6 capitalize text-gray-600">
                {transaction.transaction_type}
              </td>
              <td className="py-4 px-6 text-gray-600">{new Date(transaction.transaction_date).toLocaleDateString()}</td>

              <td
               className={`py-4 px-6 font-semibold ${
               transaction.transaction_type === "deposit" ? "text-green-500" : "text-red-500"
               }`}
              >
             {transaction.transaction_type === "deposit"
              ? `+ Frw ${transaction.amount}`
              : `- Frw ${Math.abs(transaction.amount)}`}
             </td>

              <td className="py-4 px-6">
                <button className="text-blue-600 border border-blue-500 px-3 py-1 rounded-full hover:bg-blue-100">
                <Icon icon="line-md:downloading-loop" width="24" height="24" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {modalType === "edit" ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <input
              name="account_id"
              placeholder="Account ID"
              value={formData.account_id}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
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
              onClick={modalType === "edit" ? handleUpdateTransaction : handleAddTransaction}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default TransactionsTable;
