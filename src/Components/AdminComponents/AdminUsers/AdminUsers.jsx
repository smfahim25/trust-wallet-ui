import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../api/getApiURL";
import axios from "axios";
import { toast } from "react-toastify";
import BalanceModal from "./BalanceModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfit, setIsProfit] = useState("Lose");
  const [updateSuccess, setIsUpdateSuccess] = useState(false);
  const [referal, setReferal] = useState(null);

  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    if(updateSuccess){
      fetchUserInfo();
    }
  }, [updateSuccess]);


  const handleRefUpdate = async (user) => {
    const updatedUser = {
      is_referral: user.is_referral === 1 ? 0 : 1,
    };
    
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, updatedUser);
      toast.success("User updated successfully");
      console.log("Data successfully submitted:", response);
      setIsUpdateSuccess(!updateSuccess);  // Toggle to trigger re-fetch
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to update user.");
    }
  };

  const handleProfitUpdate = async (user) => {
    const updatedUser = {
      is_profit: user.is_profit === 1 ? 0 : 1,
    };
    
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, updatedUser);
      toast.success("User updated successfully");
      console.log("Data successfully submitted:", response);
      setIsUpdateSuccess(!updateSuccess); 
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to update user.");
    }
  };
  const openBalanceModal = (user) => {
    setUserDetails(user);
    setIsBalanceModalOpen(true);
  };

  const closeBalanceModal = () => {
    setIsBalanceModalOpen(false);
    setUserDetails(null);
  };
  const handleDelete = () => {
    console.log("deleting ");
  };


  const formatWalletAddress = (address) => {
    return address.match(/.{1,14}/g).map((segment, index) => (
      <span key={index} style={{ display: 'block' }}>{segment}</span>
    ));
  };

  return (
    <div className="h-[80vh] overflow-x-auto overflow-y-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="py-2 px-4 border-b">#</th> */}
            <th className="py-2 px-4 border-b">UUID</th>
            <th className="py-2 px-4 border-b">Name</th>

            <th className="py-2 px-4 border-b">Email</th>
            {/* <th className="py-2 px-4 border-b">Mobile</th> */}

            <th className="py-2 px-4 border-b">Wallet</th>
            <th className="py-2 px-4 border-b">Referral UID</th>

            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Registration</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users?.map((user, index) => (
            <tr key={user.id}>
              {/* <td className="py-2 px-4 border-b">{index + 1}</td> */}
              <td className="py-2 px-4 border-b">{user.uuid}</td>
              <td className="py-2 px-4 border-b">{user?.name}</td>
              <td className="py-2 px-4 border-b">{user?.email}</td>
              
              <td className="py-2 px-4 border-b">
                {formatWalletAddress(user?.user_wallet)}
              </td>

              <td className="py-2 px-4 border-b">{user?.mobile}</td>
             
              <td className="py-2 px-4 border-b">{user?.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(user?.user_registered)
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19)}
              </td>
            
              <td className="py-2 px-4 border-b">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => openBalanceModal(user)}
                    className="bg-gray-800 hover:bg-blue-600 text-xs text-white py-1 px-2 rounded"
                  >
                    Balance
                  </button>
                  <button
                    onClick={() => handleRefUpdate(user)}
                    className={`text-xs text-white py-1 px-2 rounded ${
                      user.is_referral === 1 ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-600"
                    }`}
                  >
                    {user.is_referral === 1 ? "Disable Referral" : "Active Referral"}
                  </button>
                  <button
                    onClick={() => handleProfitUpdate(user)}
                    className={`text-xs text-white py-1 px-2 rounded ${
                      user.is_profit === 1 ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-600"
                    }`}
                  >
                    {user.is_profit === 1 ? "Lose" : "Profit"}
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <BalanceModal
        isOpen={isBalanceModalOpen}
        onClose={closeBalanceModal}
        details={userDetails}
        // onUpdateSuccess={handleUpdateSuccess}
      />

      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  );
};

export default AdminUsers;
