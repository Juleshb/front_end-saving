import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import ActionLogs from './ActionLogs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionPieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'https://umuhuza.store/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/transactions/user');
        const transactions = response.data;

        // Process data to calculate deposits and withdrawals
        let totalDeposits = 0;
        let totalWithdrawals = 0;

        transactions.forEach((transaction) => {
          const amount = parseFloat(transaction.amount);
          if (transaction.transaction_type === 'deposit') {
            totalDeposits += amount;
          } else if (transaction.transaction_type === 'withdrawal') {
            totalWithdrawals += amount;
          }
        });

        const totalAmount = totalDeposits + totalWithdrawals;

        // Prepare data for Pie Chart
        setChartData({
          labels: ['Deposits', 'Withdrawals'],
          datasets: [
            {
              label: 'Transaction Amounts',
              data: [totalDeposits, totalWithdrawals],
              backgroundColor: ['#00CED1', '#FFA500'], // Cyan and Orange
              hoverBackgroundColor: ['#00E5E5', '#FFB347'], // Lighter shades on hover
              borderWidth: 0,
              cutout: '50%', // Creates the "donut" effect
            },
          ],
          totalAmount,
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.chart.config.data.totalAmount;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: $${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="hidden md:block max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg  text-center text-gray-500 mb-4">Deposits vs Withdrawals</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="flex justify-center">
          <div className="w-64 h-64">
            <Pie data={chartData} options={options} />
          </div>
        </div>
      )}
      <ActionLogs />
    </div>
  );
};

export default TransactionPieChart;
