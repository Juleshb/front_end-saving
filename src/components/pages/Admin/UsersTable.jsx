import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Sidebar from './Sidebar'
import Navbar from "./nav";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://umuhuza.store/api/users");
  
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
        await axios.delete(`https://umuhuza.store/api/users/${userId}`);
        setUsers(users.filter((user) => user.user_id !== userId));
        alert("User deleted successfully.");
      } catch (error) {
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://umuhuza.store/api/users/${selectedUser.user_id}`,
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
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
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

  return (
<>
<Sidebar />
<div className="relative md:ml-64 bg-blueGray-100">
<Navbar/>
      <div className="max-w-7xl mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">All Members</h1>
          <input
            type="text"
            placeholder="Search by Name, Email, or NID..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
          <tbody className="text-gray-600 text-sm font-light">
  {filteredUsers.length > 0 ? (
    filteredUsers.map((user) => (
      <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left">{user.identification_number}</td>
        <td className="py-3 px-6 text-left">{user.name}</td>
        <td className="py-3 px-6 text-left">{user.email}</td>
        <td className="py-3 px-6 text-left">{user.telephone}</td>
        <td className="py-3 px-6 text-left capitalize">{user.role}</td>
        <td className="py-3 px-6 text-left">
          {new Date(user.created_at).toLocaleDateString()}
        </td>
        <td className="py-3 px-6 text-left flex gap-2">
          <button
            onClick={() => handleView(user)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            <Icon icon="mdi:eye" width="24" height="24" />
          </button>
          <button
            onClick={() => handleEdit(user)}
            className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
          >
            <Icon icon="la:edit" width="24" height="24" />
          </button>
          <button
            onClick={() => handleDelete(user.user_id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            <Icon icon="hugeicons:delete-02" width="24" height="24" />
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
