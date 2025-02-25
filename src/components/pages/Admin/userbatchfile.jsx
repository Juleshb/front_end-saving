import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from "@iconify/react";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

import toast, { Toaster } from "react-hot-toast";


const BatchRegister = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.xlsx, .xls',
    });

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select an Excel file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            setProgress(0);
            const token = localStorage.getItem('token');
            await axios.post(
                'https://umuhuza.store/api/users/batch-register',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    },
                }
            );

            toast.success('Batch registration completed successfully.');
            setFile(null);
        } catch (error) {
            console.error('Error during batch registration:', error);
            toast.error(error.response?.data?.error || 'Failed to upload file.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mb-4 mx-auto  p-8 border border-gray-200 ">
           <Toaster position="top-center" reverseOrder={false} />
            <h2 className="text-xs font-semibold text-gray-700 mb-4">Batch Register Users</h2>
            <motion.div 
                {...getRootProps()} 
                className="mb-4 flex flex-col items-center text-xs h-36 content-center p-4 bg-green-100 border-2 border-dotted border-primary rounded-md cursor-pointer hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
            >
                <input {...getInputProps()} />
                {file ? <p>{file.name}</p> : <p className='justify-items-center  text-green-400'> <Icon icon="mdi:file-excel-outline" width="24" height="24" /> Drag & drop a file here, or click to select one</p>}
            </motion.div>
            <div className="mb-4">
                {uploading && (
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
            <button 
                onClick={handleUpload} 
                disabled={uploading}
                className="flex items-center justify-center text-xs space-x-2 border-2 border-primary text-primary p-2 rounded-md hover:bg-primary hover:text-white transition"
            >
                {uploading ? (
                    <>
                        <Icon icon="line-md:loading-loop" width="16" height="16" />
                        <span>Uploading... {progress}%</span>
                    </>
                ) : (
                    <>
                        <Icon icon="line-md:cloud-alt-upload-loop" width="24" height="24" />
                        <span>Upload</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default BatchRegister;
