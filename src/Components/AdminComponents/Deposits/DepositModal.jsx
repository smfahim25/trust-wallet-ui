import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../api/getApiURL';
import axios from 'axios';
import { toast } from 'react-toastify';

const DepositModal = ({ isOpen, onClose, details,onUpdateSuccess,title }) => {
  const [amount, setAmount] = useState(details?.amount || '');
  const [status, setStatus] = useState(details?.status || '');

  useEffect(() => {
    // When details change, update the state
    setAmount(details?.amount || '');
    setStatus(details?.status || '');
  }, [details]);

  const handleChange = (e) => {
    if (e.target.name === "amount") {
      setAmount(e.target.value);
    } else if (e.target.name === "status") {
      setStatus(e.target.value);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      amount,
      status,
    };

    console.log(updatedData);
    if(title==='Deposit'){
      try {
        const response = await axios.put(`${API_BASE_URL}/deposits/${details.id}`, updatedData);
        toast.success("Deposit updated successfully");
        console.log("Data successfully submitted:", response);
        onClose();
        onUpdateSuccess();
  
      } catch (error) {
        console.error("Error submitting data:", error);
        toast.error("Failed to update deposit.");
      }

    }else{
      try {
        const response = await axios.put(`${API_BASE_URL}/withdraws/${details.id}`, updatedData);
        toast.success("Withdraw updated successfully");
        console.log("Data successfully submitted:", response);
        onClose();
        onUpdateSuccess();
  
      } catch (error) {
        console.error("Error submitting data:", error);
        toast.error("Failed to update Withdraw.");
      }

    }
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white text-black">
        <button onClick={onClose} className="absolute top-2 right-2 bg-gray-900 hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
            <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
          </svg>
        </button>

        <h2 className="text-2xl font-semibold leading-tight tracking-wide">Update {title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">
              {title} Amount
            </label>
            <input
              id="amount"
              type="text"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="amount"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled hidden>
                Select Status
              </option>
              <option value="approved">Approve</option>
              <option value="pending">Pending</option>
              <option value="rejected">Reject</option>
            </select>
          </div>
        </div>
        <div className='mb-4'>
          {title === "Deposit" && details?.documents && (
            <img src={`${API_BASE_URL}/${details.documents}`} alt="doc" />
          )}
        </div>

        <button onClick={handleUpdate} className="absolute bottom-2 right-2 bg-gray-900 hover:bg-gray-700">
          Update
        </button>
      </div>
    </div>
  );
};

export default DepositModal;
