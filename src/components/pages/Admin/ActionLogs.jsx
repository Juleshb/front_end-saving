import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaDatabase, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";

const ActionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 3;

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
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className="text-sm font-bold text-center text-gray-700 mb-8">
        <span className="text-blue-500">Activity Logs</span>
      </motion.h2>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400 text-sm" />
        </div>
        <button
          onClick={() => setSearch('')}
          className="ml-4 px-4 py-2 text-xs text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Clear 
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : currentLogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLogs.map((log) => (
            <motion.div key={log.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="bg-white hover:shadow-lg transition-shadow duration-300 rounded-lg">

              <div className="relative rounded-lg border shadow-lg">
  

  <div className="flex items-center gap-4 p-4">
  <FaDatabase className="text-blue-500 mr-2" /> 

    <div>
      <p className="font-medium text-xs text-gray-900"><span className="font-medium text-blue-600"></span>{log.action}</p>

      <p className="line-clamp-1 text-xs text-gray-500">
      <time className="flex items-center text-xs text-gray-500"><FaClock className="text-gray-400 mr-2" />{new Date(log.timestamp).toLocaleString()}</time>
      </p>
    </div>
  </div>
</div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No logs found.</div>
      )}

      <div className="flex justify-between w-full text-center mt-8 inline-flex items-center gap-3">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900">
        <Icon icon="si:arrow-left-circle-line" width="24" height="24" />
        </button>
        <p className="text-xs text-gray-900">{currentPage} / {Math.ceil(filteredLogs.length / logsPerPage)}</p>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredLogs.length / logsPerPage)} className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900">
        <Icon icon="si:arrow-right-circle-line" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default ActionLogs;