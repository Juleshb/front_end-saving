import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanApply = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanForm, setLoanForm] = useState({ user_id: '', amount: '', repayment_period: '' });

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'https://umuhuza.store/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch all loans
  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/loans');
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply for a loan
  const applyForLoan = async () => {
    const { user_id, amount, repayment_period } = loanForm;
    if (!user_id || !amount || !repayment_period) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await axiosInstance.post('/loans', { user_id, amount, repayment_period });
      alert('Loan application submitted successfully');
      setLoanForm({ user_id: '', amount: '', repayment_period: '' });
      setIsModalOpen(false);
      fetchLoans();
    } catch (error) {
      console.error('Error applying for loan:', error);
      alert('Failed to apply for loan');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Loan Apply</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Apply for Loan
      </button>

      {loading ? (
        <p className="text-center text-gray-600">Loading loans...</p>
      ) : loans.length === 0 ? (
        <p className="text-center text-gray-600">No loans found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">Loan ID</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.loan_id} className="text-gray-700">
                  <td className="border px-4 py-2">{loan.loan_id}</td>
                  <td className="border px-4 py-2">{loan.user_id}</td>
                  <td className="border px-4 py-2">Frw {loan.amount}</td>
                  <td className="border px-4 py-2 capitalize">{loan.status}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Loan Details</h2>
            <p>
              <strong>Loan ID:</strong> {selectedLoan.loan_id}
            </p>
            <p>
              <strong>User ID:</strong> {selectedLoan.user_id}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedLoan.amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedLoan.status}
            </p>
            <p>
              <strong>Repayment Period:</strong> {selectedLoan.repayment_period} months
            </p>
            <button
              onClick={() => setSelectedLoan(null)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Apply for Loan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Apply for a Loan</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">User ID</label>
              <input
                type="text"
                value={loanForm.user_id}
                onChange={(e) => setLoanForm({ ...loanForm, user_id: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your user ID"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Loan Amount</label>
              <input
                type="number"
                value={loanForm.amount}
                onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter loan amount"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Repayment Period (Months)</label>
              <input
                type="number"
                value={loanForm.repayment_period}
                onChange={(e) => setLoanForm({ ...loanForm, repayment_period: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter repayment period"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={applyForLoan}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApply;
