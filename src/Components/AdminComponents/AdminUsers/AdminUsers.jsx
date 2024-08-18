import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../api/getApiURL";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfit, setIsProfit] = useState("Lose");
  const [referal, setReferal] = useState(null);

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
  }, []);

  const handleDelete = () => {
    console.log("deleting ");
  };
  const handleEdit = () => {
    console.log("deleting ");
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
            <th className="py-2 px-4 border-b">Mobile</th>

            <th className="py-2 px-4 border-b">Wallet</th>
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
              <td className="py-2 px-4 border-b">{user?.mobile}</td>
              <td className="py-2 px-4 border-b">{user?.user_wallet}</td>
             
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
      onClick={() => handleEdit(user)}
      className="bg-gray-800 hover:bg-blue-600 text-xs text-white py-1 px-2 rounded"
    >
      Balance
    </button>
    <button
      onClick={() => handleEdit(user)}
      className="bg-gray-800 hover:bg-blue-600 text-xs text-white py-1 px-2 rounded"
    >
      Active Referral
    </button>
    <button
      onClick={() => handleDelete(user.id)}
      className="bg-gray-800 hover:bg-red-600 text-xs text-white py-1 px-2 rounded"
    >
      Profit
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  );
};

export default AdminUsers;
