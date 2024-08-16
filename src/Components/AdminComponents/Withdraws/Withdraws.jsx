import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../../api/getApiURL';

const Withdraws = () => {
    const [withdraws, setWithdraws] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWithdrawInfo = async () => {
          setLoading(true);
          try {
            const response = await fetch(`${API_BASE_URL}/withdraws`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setWithdraws(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
       
          fetchWithdrawInfo();
        
      }, []);
    
        const handleDelete = ()=>{
            console.log("deleting ");
        }
        const handleEdit = ()=>{
            console.log("deleting ");
        }

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">UUID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    
                    <th className="py-2 px-4 border-b">Amount</th>
                    {/* <th className="py-2 px-4 border-b">Documets</th> */}
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {withdraws?.map((withdraw, index) => (
                    <tr key={withdraw.id}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{withdraw?.user_id}</td>
                        <td className="py-2 px-4 border-b">{withdraw?.name}</td>
                        <td className="py-2 px-4 border-b">{withdraw?.amount}</td>
                        
                        <td className="py-2 px-4 border-b">{withdraw.status}</td>
                       
                        {/* <td className="py-2 px-4 border-b">{withdraw.brand}</td> */}


                        {/* <td className="py-2 px-4 border-b">{withdraw.quantity}</td>
                        <td className="py-2 px-4 border-b">{withdraw.price}</td> */}
                        <td className="py-2 px-4 border-b">
                            <button onClick={()=>handleEdit(withdraw)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={()=>handleDelete(withdraw.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
    );
};

export default Withdraws;