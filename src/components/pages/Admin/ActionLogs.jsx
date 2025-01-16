import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaTrashAlt, FaDatabase, FaClock } from 'react-icons/fa';

const ActionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'https://umuhuza.store/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get('/admin-logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.affected_table && log.affected_table.toLowerCase().includes(search.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 py-8 px-4">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-8">
        <span className="text-blue-500">Activity Logs</span>
      </h2>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
        </div>
        <button
          onClick={() => setSearch('')}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Clear <FaTrashAlt className="inline ml-2" />
        </button>
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
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
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      ) : currentLogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentLogs.map((log) => (
            <div
              key={log.id}
              className=" bg-white p-2 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
                <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
    >
       <div className="flex items-center justify-between mb-3">
                <span className="flex items-center text-lg font-semibold text-gray-700">
                  <FaDatabase className="text-blue-500 mr-2" />
                  {log.affected_table || 'N/A'}
                </span>
               
              </div>

      <svg
        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div>

    <p className="text-gray-700 mb-3">
                <span className="font-medium text-blue-600">Action: </span>
                {log.action}
              </p>
              <p className="text-sm mb-3 text-gray-500">{log.details || 'No additional details'}</p>
              <time className="flex items-center text-sm text-gray-500">
                  <FaClock className="text-gray-400 mr-2" />
                  {new Date(log.timestamp).toLocaleString()}
                </time>
                </div>
  </details>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No logs found.</div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(filteredLogs.length / logsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionLogs;
