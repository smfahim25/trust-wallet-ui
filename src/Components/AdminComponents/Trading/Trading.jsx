import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../../api/getApiURL';
import { toast } from 'react-toastify';
import axios from 'axios';
import DeleteModal from '../DeleteModal/DeleteModal';

const Trading = () => {
    const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTradeId, setSelectedTradeId] = useState(null);

  useEffect(() => {
    const fetchTradeOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/tradeorder`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTrades(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   
      fetchTradeOrders();
    
  }, []);

  const handleDelete = async (tradeId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tradeorder/${tradeId}`);
        console.log("Delete response: ", response);
        setTrades((prevTrades) => prevTrades.filter(trade => trade.id !== tradeId));
        toast.success("Delete Successful");
    } catch (error) {
        console.error("There was an error deleting the trade: ", error);
        toast.error("Delete Failed");
    }
};

const openModal = (tradeId) => {
  setSelectedTradeId(tradeId);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedTradeId(null);
};

const confirmDelete = () => {
  if (selectedTradeId) {
      handleDelete(selectedTradeId);
  }
  closeModal();
};

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
                    <th className="py-2 px-4 border-b">Order Id</th>
                    <th className="py-2 px-4 border-b">Order Type</th>
                    
                    <th className="py-2 px-4 border-b">Order Position</th>
                    <th className="py-2 px-4 border-b">Wallet Coin</th>
                    <th className="py-2 px-4 border-b">Trade Coin</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Profit Amount</th>
                    <th className="py-2 px-4 border-b">Purchase Price</th>
                    <th className="py-2 px-4 border-b">Delivery Price</th>
                    <th className="py-2 px-4 border-b">Profit Level</th>
                    <th className="py-2 px-4 border-b">Is Profit</th>
                    <th className="py-2 px-4 border-b">Delivery Time</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {trades?.map((trade, index) => (
                    <tr key={trade.id}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{trade?.user_id}</td>
                        <td className="py-2 px-4 border-b">{trade?.order_id}</td>
                        <td className="py-2 px-4 border-b">{trade?.order_type}</td>
                        <td className="py-2 px-4 border-b">{trade?.order_position}</td>
                        <td className="py-2 px-4 border-b">{trade?.wallet_coin_id}</td>
                        <td className="py-2 px-4 border-b">{trade?.trade_coin_id}</td>
                        <td className="py-2 px-4 border-b">{trade?.amount}</td>
                        <td className="py-2 px-4 border-b">{trade?.profit_amount}</td>
                        <td className="py-2 px-4 border-b">{trade?.purchase_price}</td>
                        <td className="py-2 px-4 border-b">{trade?.delivery_price}</td>
                        <td className="py-2 px-4 border-b">{trade?.profit_level}</td>

                        <td className="py-2 px-4 border-b">{trade?.is_profit}</td>
                        <td className="py-2 px-4 border-b">{trade?.delivery_time}</td>
                        <td className="py-2 px-4 border-b">{trade?.status}</td>
                    
                        <td className="py-2 px-4 border-b">
                            <button onClick={()=>handleEdit(trade)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={()=>openModal(trade.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                title="Trade"
                description="This action cannot be undone."
            />

        {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
    );
};

export default Trading;