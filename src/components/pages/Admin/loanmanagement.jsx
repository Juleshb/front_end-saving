import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000/api',
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

  // Approve a loan
  const approveLoan = async (loanId) => {
    try {
      await axiosInstance.put(`/loans/${loanId}/approve`);
      alert('Loan approved successfully');
      fetchLoans();
    } catch (error) {
      console.error('Error approving loan:', error);
      alert('Failed to approve loan');
    }
  };

  // Reject a loan
  const rejectLoan = async (loanId) => {
    try {
      await axiosInstance.put(`/loans/${loanId}/reject`);
      alert('Loan rejected successfully');
      fetchLoans();
    } catch (error) {
      console.error('Error rejecting loan:', error);
      alert('Failed to reject loan');
    }
  };

  // Delete a loan
  const deleteLoan = async (loanId) => {
    try {
      await axiosInstance.delete(`/loans/${loanId}`);
      alert('Loan deleted successfully');
      setIsDeleteConfirmOpen(false);
      fetchLoans();
    } catch (error) {
      console.error('Error deleting loan:', error);
      alert('Failed to delete loan');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Loan Management</h1>

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
                    {loan.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveLoan(loan.loan_id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectLoan(loan.loan_id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLoan(loan);
                        setIsDeleteConfirmOpen(true);
                      }}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loan Details Modal */}
      {selectedLoan && !isDeleteConfirmOpen && (
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
              <strong>Amount:</strong> Frw {selectedLoan.amount}
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

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this loan?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteLoan(selectedLoan.loan_id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManagement;
