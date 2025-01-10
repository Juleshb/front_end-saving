import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanRepayment = () => {
  const [loans, setLoans] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedRepayment, setSelectedRepayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [repaymentDueDate, setRepaymentDueDate] = useState('');

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
      setLoans(response.data || []);
    } catch (error) {
      console.error('Error fetching loans:', error.message);
      setError('Failed to fetch loans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch repayments for a specific loan
  const fetchRepayments = async (loanId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/loan-repayments/loan/${loanId}`);
      setRepayments(response.data || []);
    } catch (error) {
      console.error('Error fetching repayments:', error.message);
      setError('Failed to fetch repayments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new repayment
  const addRepayment = async (e) => {
    e.preventDefault();
    if (!repaymentAmount || !repaymentDueDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axiosInstance.post('/loan-repayments', {
        loan_id: selectedLoan.loan_id,
        amount: repaymentAmount,
        due_date: repaymentDueDate,
      });

      alert('Repayment added successfully!');
      setRepaymentAmount('');
      setRepaymentDueDate('');
      fetchRepayments(selectedLoan.loan_id); // Refresh repayments
    } catch (error) {
      console.error('Error adding repayment:', error.message);
      alert('Failed to add repayment. Please try again.');
    }
  };

  // Mark repayment as paid
  const markRepaymentAsPaid = async (repaymentId) => {
    try {
      await axiosInstance.put(`/loan-repayments/${repaymentId}/mark-paid`);
      alert('Repayment marked as paid!');
      fetchRepayments(selectedLoan.loan_id); // Refresh repayments
    } catch (error) {
      console.error('Error marking repayment as paid:', error.message);
      alert('Failed to mark repayment as paid. Please try again.');
    }
  };

  // Delete repayment
  const deleteRepayment = async (repaymentId) => {
    if (window.confirm('Are you sure you want to delete this repayment?')) {
      try {
        await axiosInstance.delete(`/loan-repayments/${repaymentId}`);
        alert('Repayment deleted successfully!');
        fetchRepayments(selectedLoan.loan_id); // Refresh repayments
      } catch (error) {
        console.error('Error deleting repayment:', error.message);
        alert('Failed to delete repayment. Please try again.');
      }
    }
  };

  // Open modal to view repayment details
  const openModal = (repayment) => {
    setSelectedRepayment(repayment);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedRepayment(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Loan Repayments</h2>

      {/* Loan Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select a Loan</h3>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Loan ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Repayment Period</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr key={loan.loan_id}>
                  <td className="border p-2">{loan.loan_id}</td>
                  <td className="border p-2">{loan.user_id}</td>
                  <td className="border p-2">Frw {loan.amount}</td>
                  <td className="border p-2">{loan.repayment_period} months</td>
                  <td className="border p-2">{loan.status}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => {
                        setSelectedLoan(loan);
                        fetchRepayments(loan.loan_id);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      View Repayments
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No loans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Repayments Section */}
      {selectedLoan && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Repayments for Loan ID: {selectedLoan.loan_id}
          </h3>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Repayment ID</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Due Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {repayments.length > 0 ? (
                repayments.map((repayment) => (
                  <tr key={repayment.repayment_id}>
                    <td className="border p-2">{repayment.repayment_id}</td>
                    <td className="border p-2">Frw {repayment.amount}</td>
                    <td className="border p-2">{repayment.due_date}</td>
                    <td className="border p-2">{repayment.status}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => markRepaymentAsPaid(repayment.repayment_id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        disabled={repayment.status === 'paid'}
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => openModal(repayment)}
                        className="bg-gray-500 text-white px-2 py-1 rounded mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteRepayment(repayment.repayment_id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No repayments found for this loan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Add Repayment Form */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Add Repayment</h4>
            <form onSubmit={addRepayment} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={repaymentAmount}
                  onChange={(e) => setRepaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={repaymentDueDate}
                  onChange={(e) => setRepaymentDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Repayment
                </button>
              </div>
            </form>
          </div>

          {/* Modal for Repayment Details */}
          {isModalOpen && selectedRepayment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h4 className="text-lg font-bold mb-4">
                  Repayment Details
                </h4>
                <p>
                  <strong>Repayment ID:</strong> {selectedRepayment.repayment_id}
                </p>
                <p>
                  <strong>Amount:</strong> Frw {selectedRepayment.amount}
                </p>
                <p>
                  <strong>Due Date:</strong> {selectedRepayment.due_date}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRepayment.status}
                </p>
                <div className="mt-4 text-right">
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanRepayment;
