import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../../api/getApiURL';
import DepositModal from '../Deposits/DepositModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteModal from '../DeleteModal/DeleteModal';

const Withdraws = () => {
    const [withdraws, setWithdraws] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDepositId, setSelectedTradeId] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [depositDetail, setDepositDetail] = useState(null);
    const [refreshDeposit, setRefreshDeposit] = useState(false);

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
          if(refreshDeposit){
            fetchWithdrawInfo();
          }
        
      }, [refreshDeposit]);
    
      const handleDelete = async (withdrawID) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/withdraws/${withdrawID}`);
            console.log("Delete response: ", response);
            setWithdraws((prevWithdraws) => prevWithdraws.filter(deposit => deposit.id !== withdrawID));
            toast.success("Delete Successful");
        } catch (error) {
            console.error("There was an error deleting the withdraws: ", error);
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
      if (selectedDepositId) {
          handleDelete(selectedDepositId);
      }
      closeModal();
    };
    const openDetailsModal = (trade) => {
        setDepositDetail(trade);
        setIsDetailsModalOpen(true);
      };
      
      const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setDepositDetail(null);
      };
    
      const handleUpdateSuccess = () => {
        setRefreshDeposit(!refreshDeposit);
      };

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">UUID</th>
                    <th className="py-2 px-4 border-b">Wallet</th>
                    
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
                        <td className="py-2 px-4 border-b">{withdraw?.coin_id}</td>
                        <td className="py-2 px-4 border-b">{withdraw?.amount}</td>
                        
                        <td className="py-2 px-4 border-b">{withdraw.status}</td>
                       
                        {/* <td className="py-2 px-4 border-b">{withdraw.brand}</td> */}


                        {/* <td className="py-2 px-4 border-b">{withdraw.quantity}</td>
                        <td className="py-2 px-4 border-b">{withdraw.price}</td> */}
                        <td className="py-2 px-4 border-b">
                            <button onClick={()=>openDetailsModal(withdraw)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={()=>openModal(withdraw.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
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
                title="Withdraw"
                description="This action cannot be undone."
            />

            <DepositModal
            title="Withdraw"
                isOpen={isDetailsModalOpen}
                onClose={closeDetailsModal}
                details={depositDetail}
                onUpdateSuccess={handleUpdateSuccess}
            />  

        {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
    );
};

export default Withdraws;