import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../../api/getApiURL';

const Wallets = () => {
const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/wallets`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWallets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   
      fetchWalletInfo();
    
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
                            <th className="py-2 px-4 border-b">Coin ID</th>
                            <th className="py-2 px-4 border-b">Coin Symbol</th>
                            
                            <th className="py-2 px-4 border-b">Coin Name</th>
                            <th className="py-2 px-4 border-b">Wallet Network</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {wallets?.map((wallet, index) => (
                            <tr key={wallet.id}>
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{wallet.coin_id}</td>
                                <td className="py-2 px-4 border-b">{wallet?.coin_symbol}</td>
                                <td className="py-2 px-4 border-b">{wallet?.coin_name}</td>
                                <td className="py-2 px-4 border-b">{wallet.wallet_network}</td>
                                <td className="py-2 px-4 border-b">{wallet.status}</td>
                               
                                {/* <td className="py-2 px-4 border-b">{wallet.brand}</td> */}


                                {/* <td className="py-2 px-4 border-b">{wallet.quantity}</td>
                                <td className="py-2 px-4 border-b">{wallet.price}</td> */}
                                <td className="py-2 px-4 border-b">
                                    <button onClick={()=>handleEdit(wallet)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                        Edit
                                    </button>
                                    <button onClick={()=>handleDelete(wallet.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
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

export default Wallets;