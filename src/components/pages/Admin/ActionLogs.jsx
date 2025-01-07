import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10; // Number of logs to show per page

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetch logs from API
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

  // Filter logs based on search query
  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.affected_table && log.affected_table.toLowerCase().includes(search.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination Logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto bg-white ">
      <h2 className="text-lg text-center text-gray-500 mb-4">Activities</h2>

      {/* Logs Table */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-x-auto">
           
            <tbody>
              {currentLogs.length > 0 ? (
                currentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-gray-700">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{log.admin_id}</td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{log.action}</td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700">
                      {log.affected_table || 'N/A'}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700">{log.details || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredLogs.length / logsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
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
