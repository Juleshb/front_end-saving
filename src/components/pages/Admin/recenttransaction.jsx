import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Recenttransactions = () => {
  const [transactions, setTransactions] = useState([]);

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
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };
    fetchTransactions();
  }, []);

  const downloadReceipt = async (transaction) => {
    // Create a new PDF
    const pdf = new jsPDF();
    const date = new Date(transaction.transaction_date).toLocaleDateString();

    // Add Receipt content to PDF
    pdf.setFontSize(16);
    pdf.text("Transaction Receipt", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Transaction ID: ${transaction.transaction_id}`, 20, 40);
    pdf.text(`Account Number: ${transaction.account_id}`, 20, 50);
    pdf.text(`Transaction Date: ${date}`, 20, 60);
    pdf.text(`Transaction Type: ${transaction.transaction_type}`, 20, 70);
    pdf.text(
      `Amount: ${transaction.transaction_type === "deposit" ? "+" : "-"} Frw ${transaction.amount}`,
      20,
      80
    );

    // Add footer
    pdf.text("Thank you for using our services!", 20, 100);

    // Save the PDF
    pdf.save(`receipt_${transaction.transaction_id}.pdf`);
  };

  return (
    <div className="">
      <span className="text-gray-500 text-xs">Recent Transactions</span>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-x-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-500 text-xs ">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Transaction ID</th>
            <th className="py-3 px-6 text-left">Account Number</th>
            <th className="py-3 px-6 text-left">Account Names</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Receipt</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 border-b">
              <td className="py-4 px-6 flex items-center">
                <Icon
                  icon={
                    transaction.transaction_type === "deposit"
                      ? "mdi:arrow-down-circle-outline"
                      : "mdi:arrow-up-circle-outline"
                  }
                  className={`mr-2 text-xs ${
                    transaction.transaction_type === "deposit" ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span className="text-gray-700 text-xs">
                  {new Date(transaction.transaction_date).toLocaleDateString()}
                </span>
              </td>

              <td className="py-4 px-6 text-blue-500 text-xs underline cursor-pointer">
               TX-{transaction.transaction_number}
              </td>

              <td className="py-4 px-6 text-gray-600 text-xs  cursor-pointer">
                {transaction.accountnumber}
              </td>

              <td className="py-4 px-6 capitalize text-xs text-gray-600">
                {transaction.name}
              </td>

              <td
                className={`py-4 px-6 text-xs ${
                  transaction.transaction_type === "deposit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.transaction_type === "deposit"
                  ? `+ Frw ${transaction.amount}`
                  : `- Frw ${Math.abs(transaction.amount)}`}
              </td>

              <td className="py-4 px-6">
                <button
                  className="text-blue-600 border border-blue-500 px-3 py-1 rounded-full hover:bg-blue-100"
                  onClick={() => downloadReceipt(transaction)}
                >
                  <Icon icon="line-md:downloading-loop" width="16" height="16" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recenttransactions;
