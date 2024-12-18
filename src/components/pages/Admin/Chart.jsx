import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import Recenttransactions from './recenttransaction';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CombinedChart = () => {
  const [depositChartData, setDepositChartData] = useState(null);
  const [withdrawalChartData, setWithdrawalChartData] = useState(null);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:9000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/transactions");
        const data = response.data;

        const groupedData = {};
        data.forEach((transaction) => {
          const date = transaction.transaction_date.split('T')[0];
          const amount = parseFloat(transaction.amount);

          if (!groupedData[date]) {
            groupedData[date] = { deposit: 0, withdrawal: 0 };
          }

          if (transaction.transaction_type === 'deposit') {
            groupedData[date].deposit += amount;
          } else if (transaction.transaction_type === 'withdrawal') {
            groupedData[date].withdrawal += amount;
          }
        });

        const labels = Object.keys(groupedData).sort();
        const deposits = labels.map((date) => groupedData[date].deposit);
        const withdrawals = labels.map((date) => groupedData[date].withdrawal);

        setDepositChartData({
          labels,
          datasets: [
            {
              label: 'Deposits',
              data: deposits,
              borderColor: '#00CED1',
              backgroundColor: 'rgba(0, 206, 209, 0.2)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: '#00CED1',
              pointHoverRadius: 7,
            },
          ],
        });

        setWithdrawalChartData({
          labels,
          datasets: [
            {
              label: 'Withdrawals',
              data: withdrawals,
              borderColor: '#FFA500',
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 5,
              pointBackgroundColor: '#FFA500',
              pointHoverRadius: 7,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          color: '#888',
        },
        title: {
          display: true,
          text: 'Amount (Frw)',
          color: '#555',
        },
      },
      x: {
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          color: '#888',
        },
        title: {
          display: true,
          text: 'Date',
          color: '#555',
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap gap-2 justify-between p-6">
      {/* Deposits Chart Card */}
      <div className="w-5/12 bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-lg  mb-4 text-gray-500">Deposits Over Time</h3>
        {depositChartData ? (
          <Line data={depositChartData} options={options} />
        ) : (
          <p className="text-gray-500">Loading Deposits...</p>
        )}
      </div>

      {/* Withdrawals Chart Card */}
      <div className="w-5/12  bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-lg  mb-4 text-gray-500">Withdrawals Over Time</h3>
        {withdrawalChartData ? (
          <Line data={withdrawalChartData} options={options} />
        ) : (
          <p className="text-gray-500">Loading Withdrawals...</p>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="w-full">
        <Recenttransactions />
      </div>
    </div>
  );
};

export default CombinedChart;
