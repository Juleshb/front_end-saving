import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Sidebar from './Sidebar'
import Navbar from "./nav";
import BatchRegister from "./userbatchfile";
import Logo from "../../assets/logo.png";
import { motion } from 'framer-motion';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "https://umuhuza.store/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response =await axiosInstance.get("/users");
  
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); 
          setFilteredUsers(response.data); 
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setError("Failed to fetch users. Please try again.");
      } finally {
        setLoading(false); 
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.identification_number?.toLowerCase().includes(query)
    );
  
    setFilteredUsers(filtered);
  };
  
  

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalType("edit");
    setShowModal(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setModalType("view");
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        setUsers(users.filter((user) => user.user_id !== userId));
        alert("User deleted successfully.");
      } catch (error) {
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, { role: newRole });
  
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success("User role updated successfully.");
      }
    } catch (error) {
      console.error("Error updating user role:", error.message);
      toast.error("Failed to update user role. Please try again.");
    }

    fetchUsers();
  };
  

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(
        `/users/${selectedUser.user_id}`,
        selectedUser
      );
      setUsers(
        users.map((user) =>
          user.user_id === selectedUser.user_id ? response.data : user
        )
      );
      setShowModal(false);
      alert("User updated successfully.");
    } catch (error) {
      alert("Failed to update user. Please try again.");
    }

    fetchUsers();
  };

  if (loading) {
    return (
      <div className="flex bg-primary justify-center items-center h-screen">
  <motion.img 
      src={Logo}
      alt="Loading..." 
      className="h-36"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  />
</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstLog, indexOfLastLog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
<>
<Sidebar />
<div className="relative md:ml-64 bg-blueGray-100">
<Navbar/>
      <div className="max-w-7xl mt-20 mx-auto bg-white  rounded-lg overflow-hidden">
    
        <BatchRegister />
          <div className="flex justify-between items-center p-4">
          <h1 className="text-sm font-bold">All Members</h1>
          <input
            type="text"
            placeholder="Search by Name, Email, or NID..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/3 px-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-primary"
          />
        </div>
        <div className="overflow-x-auto justify-items-center m-4">
          <table className="min-w-full bg-white border border-primary">
          <thead className="text-xs border border-primary  text-gray-500 bg-gray-50">
  <tr>
    <th className="py-3 px-6 text-left">NID</th>
    <th className="py-3 px-6 text-left">Names</th>
    <th className="py-3 px-6 text-left">Email</th>
    <th className="py-3 px-6 text-left">Phone</th>
    <th className="py-3 px-6 text-left">Role</th>
    <th className="py-3 px-6 text-left">Created At</th>
    <th className="py-3 px-6 text-left">Actions</th>
  </tr>
</thead>
          <tbody className="text-gray-600 text-xs font-light">
  {currentUsers.length > 0 ? (
    currentUsers.map((user) => (
      <tr key={user.user_id} className=" hover:bg-primary hover:text-white">
        <td className="py-3 px-6 text-left">{user.identification_number}</td>
        <td className="py-3 px-6 text-left">{user.name}</td>
        <td className="py-3 px-6 text-left">{user.email}</td>
        <td className="py-3 px-6 text-left">0{user.telephone}</td>
        <td className="py-3 px-6 text-left capitalize">
          <select
            value={user.role}
            onChange={(e) => handleUpdateRole(user.user_id, e.target.value)}
            className="px-2 py-1  text-primary border-primary border"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </td>
        <td className="py-3 px-6 text-left">
          {new Date(user.created_at).toLocaleDateString()}
        </td>
        <td className="py-3 px-6 text-left flex gap-2 bg-green-100 border-l-2 border-primary">
          <button
            onClick={() => handleView(user)}
            className=" text-green-400 px-3 py-1 rounded-lg hover:bg-green-400 hover:text-white"
          >
            <Icon icon="mdi:eye" width="16" height="16" />
          </button>
          <button
            onClick={() => handleEdit(user)}
            className="text-primary px-3 py-1 rounded-lg hover:bg-primary hover:text-white"
          >
            <Icon icon="la:edit" width="16" height="16" />
          </button>
          <button
            onClick={() => handleDelete(user.user_id)}
            className="text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white"
          >
            <Icon icon="hugeicons:delete-02" width="16" height="16" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500 font-medium">
        No users found matching your search.
      </td>
    </tr>
  )}
</tbody>

          </table>
           <div className="flex justify-between  text-center mt-8 inline-flex items-center gap-3">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900">
                  <Icon icon="si:arrow-left-circle-line" width="24" height="24" />
                  </button>
                  <p className="text-xs text-gray-900">{currentPage} / {Math.ceil(filteredUsers.length / logsPerPage)}</p>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers.length / logsPerPage)} className="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900">
                  <Icon icon="si:arrow-right-circle-line" width="24" height="24" />
                  </button>
                </div>
        </div>
      </div>
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
            <button
               onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <Icon icon="bx:x-circle" fontSize={24} />
            </button>
      <h2 className="text-2xl font-bold mb-6 text-center">
        {modalType === "edit" ? "Edit User Details" : "User Details"}
      </h2>

      {modalType === "view" && selectedUser && (
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.telephone}
          </p>
          <p>
            <strong>Role:</strong> {selectedUser.role}
          </p>
          <p>
            <strong>NID:</strong> {selectedUser.identification_number}
          </p>
          <p>
            <strong>Date of Birth:</strong> {new Date(selectedUser.date_of_birth).toLocaleDateString()}
          </p>
          <p>
            <strong>Place of Birth:</strong> {selectedUser.place_of_birth}
          </p>
          <p>
            <strong>Residence:</strong> {selectedUser.residence_place}
          </p>
          <p>
            <strong>Address:</strong> {selectedUser.address}
          </p>
          <p>
            <strong>Position:</strong> {selectedUser.position}
          </p>
          <p>
            <strong>Place of Working:</strong> {selectedUser.place_of_working}
          </p>
          <p>
            <strong>Marital Status:</strong> {selectedUser.marital_status}
          </p>
          <p>
            <strong>Spouse Name:</strong> {selectedUser.spouse_name}
          </p>
          <p>
            <strong>Spouse NID:</strong> {selectedUser.spouse_id_number}
          </p>
          <p>
            <strong>Spouse Phone:</strong> {selectedUser.spouse_telephone}
          </p>
          <p>
            <strong>Shares:</strong> {selectedUser.shares}
          </p>
          <p>
            <strong>Monthly Saving:</strong> {selectedUser.monthly_saving}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedUser.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      {modalType === "edit" && selectedUser && (
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="text"
              value={selectedUser.telephone}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, telephone: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">NID</label>
            <input
              type="text"
              value={selectedUser.identification_number}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  identification_number: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={selectedUser.date_of_birth}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  date_of_birth: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Place of Birth
            </label>
            <input
              type="text"
              value={selectedUser.place_of_birth}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  place_of_birth: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Residence Place
            </label>
            <input
              type="text"
              value={selectedUser.residence_place}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  residence_place: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              value={selectedUser.address}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, address: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Shares</label>
            <input
              type="number"
              value={selectedUser.shares}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, shares: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Monthly Saving
            </label>
            <input
              type="number"
              value={selectedUser.monthly_saving}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  monthly_saving: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </form>
      )}
      {modalType === "edit" && (
        <button
          onClick={() => handleUpdate()}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
         <Icon icon="prime:save" width="24" height="24" />
        </button>
      )}
    </div>
  </div>
)}

      
    </div>
</>
  );
};

export default UsersTable;
