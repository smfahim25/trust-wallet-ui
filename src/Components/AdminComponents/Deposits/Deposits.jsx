import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../../api/getApiURL';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteModal from '../DeleteModal/DeleteModal';

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepositId, setSelectedTradeId] = useState(null);


  useEffect(() => {
    const fetchDepositInfo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/deposits`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDeposits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   
      fetchDepositInfo();
    
  }, []);

  const handleDelete = async (depositID) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/deposits/${depositID}`);
        console.log("Delete response: ", response);
        setDeposits((prevDeposits) => prevDeposits.filter(deposit => deposit.id !== depositID));
        toast.success("Delete Successful");
    } catch (error) {
        console.error("There was an error deleting the deposit: ", error);
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
                    <th className="py-2 px-4 border-b">Wallet</th>
                    
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Documets</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Action</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {deposits?.map((deposit, index) => (
                    <tr key={deposit.id}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">{deposit?.user_id}</td>
                        <td className="py-2 px-4 border-b">{deposit?.coin_id}</td>
                        <td className="py-2 px-4 border-b">{deposit?.amount}</td>
                        <td className="py-2 px-4 border-b">
                        <div className="bg-green-400 w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                            src={`${API_BASE_URL}/${deposit?.documents}`}
                            className="w-full h-full object-cover"
                            alt="Documents"
                        />
                        </div>

                            
                        
                            </td>
                        <td className="py-2 px-4 border-b">{deposit.status}</td>
                       
                        {/* <td className="py-2 px-4 border-b">{deposit.brand}</td> */}


                        {/* <td className="py-2 px-4 border-b">{deposit.quantity}</td>
                        <td className="py-2 px-4 border-b">{deposit.price}</td> */}
                        <td className="py-2 px-4 border-b">
                            <button onClick={()=>handleEdit(deposit)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={()=>openModal(deposit.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* image viwer modal  */}
        {/* <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-900 bg-gray-900 text-gray-100 text-gray-100">
            <button className="absolute top-2 right-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                    <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 fill-current shrink-0 text-violet-400 text-violet-400">
                <path d="M68.328,383.063a31.654,31.654,0,0,1,.207-32.118l50.883-86.406,11.516,50.76,31.207-7.08L138.257,202.944,32.983,226.828l7.08,31.207,53.149-12.058L40.96,334.707a64,64,0,0,0,55.149,96.476h82.435l32-32H96.109A31.655,31.655,0,0,1,68.328,383.063Z"></path>
                <path d="M283.379,79.762l53.747,91.268-49.053-7.653-4.934,31.617L389.8,211.635l16.64-106.66-31.617-4.933-8.873,56.87L310.954,63.524a64,64,0,0,0-110.3,0l-39.939,67.82,10.407,45.39,57.106-96.972a32,32,0,0,1,55.148,0Z"></path>
                <path d="M470.65,334.707l-47.867-81.283-41.148-6.812,61.441,104.333A32,32,0,0,1,415.5,399.183H304.046l38.359-38.358L319.778,338.2l-76.332,76.332,76.332,76.333,22.627-22.628-37.052-37.051H415.5a64,64,0,0,0,55.149-96.476Z"></path>
            </svg>
            <h2 className="text-2xl font-semibold leading-tight tracking-wide">Quis vel eros donec ac odio tempor.</h2>
            <p className="flex-1 text-center text-gray-400 text-gray-400">Tempora ipsa quod magnam non, dolores nemo optio. Praesentium soluta maiores non itaque aliquam sint.</p>
            <button type="button" className="px-8 py-3 font-semibold rounded-full bg-violet-400 bg-violet-400 text-gray-900 text-gray-900">Start recycling</button>
        </div> */}

            <DeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                title="Deposit"
                description="This action cannot be undone."
            />

        {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
    );
};

export default Deposits;