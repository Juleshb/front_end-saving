import React, { useState } from 'react';
import axios from 'axios';

const BatchRegister = () => {
    const [file, setFile] = useState(null); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select an Excel file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); 

        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post(
                'https://umuhuza.store/api/users/batch-register',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            );

            alert(response.data.message || 'Batch registration completed successfully.');
            setFile(null); 
        } catch (error) {
            console.error('Error during batch registration:', error);
            alert(error.response?.data?.error || 'Failed to upload file.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Batch Register Users</h2>
            <div className="mb-4">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="w-full border px-4 py-2"
                />
            </div>
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Upload and Register
            </button>
        </div>
    );
};

export default BatchRegister;
