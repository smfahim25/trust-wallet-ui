import React, {useState,useEffect} from 'react';
import { useUser } from '../../../context/UserContext';
import axios from 'axios';
import API_BASE_URL from '../../../api/getApiURL';
import DeleteModal from "../DeleteModal/DeleteModal";
import { toast } from 'react-toastify';

const Settings = () => {
    const { setLoading } = useUser();
    // const { timerProfits } = useTimerProfit();
    const [timerProfits, setTimerProfits] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTimer, setSelectedTimer] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        user_wallet: '-',
        role: 'user'
    });

    const [timerData, setTimerData] = useState({
        timer: '',
        profit: '',
        mini_usdt: ''
        
    });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimerProftis = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/timerprofits`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimerProfits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    
      fetchTimerProftis();
      if(refreshData){
        fetchTimerProftis();
      }
    
  }, [refreshData])

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTimerChange = (e) => {
        const { name, value } = e.target;
        setTimerData({
            ...timerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/users/signup`, formData);
            setResponseMessage('User registered successfully!');
            toast.success("User registered successfully!");

        } catch (error) {
            // setResponseMessage('Failed to register user.');
            console.error('There was an error!', error);
        }
    };

    const handleTimerProfitSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/timerprofits`, timerData);
            toast.success("Timer profit added successfully!");
            setRefreshData(!refreshData);

        } catch (error) {
            toast.error('Failed to add Timer profit.');
            console.error('There was an error!', error);
        }
    };

    const handleDelete = async (timerId) => {
        try {
          const response = await axios.delete(
            `${API_BASE_URL}/timerprofits/${timerId}`
          );
          console.log("Delete response: ", response);
          setTimerProfits((prevDeposits) =>
            prevDeposits.filter((deposit) => deposit.id !== timerId)
          );
          toast.success("Delete Successful");
        } catch (error) {
          console.error("There was an error deleting the timer profit: ", error);
          toast.error("Delete Failed");
        }
      };
    
      const openModal = (timerId) => {
        setSelectedTimer(timerId);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTimer(null);
      };
    
      const confirmDelete = () => {
        if (selectedTimer) {
          handleDelete(selectedTimer);
        }
        closeModal();
      };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 items-center justify-center w-full">
                <div className="flex flex-col items-center gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white text-black w-full">
                    

                    <h2 className="text-2xl font-semibold leading-tight tracking-wide">General Settings</h2>
                    
                    <div className="w-full mx-auto p-6 bg-white ">
                        <form onSubmit={handleSubmit} >
                            <div className='grid grid-cols-2 gap-4'>
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="referal_status">
                                    Referal Registration Status
                                </label>
                                <select
                                    id="referal_status"
                                    name="referal_status"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                    
                                </select>
                            </div>
                         
                            
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="referal_reg_bonus">
                                Referral Registration Bonus (USD)
                                </label>
                                <input
                                    type="number"
                                    id="referal_reg_bonus"
                                    name="referal_reg_bonus"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter registration bonus"
                                    required
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="referal_deposit_status">
                                Referral Deposit Bonus Status
                                </label>
                                <select
                                    id="referal_deposit_status"
                                    name="referal_deposit_status"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                    
                                </select>
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="referal_deposit_bonus">
                                Referral Deposit Bonus (%)
                                </label>
                                <input
                                    type="number"
                                    id="referal_deposit_bonus"
                                    name="referal_deposit_bonus"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter referal deposit bonus"
                                    required
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="trade_limit">
                                Trade Amount Limit
                                </label>
                                <input
                                    type="number"
                                    id="trade_limit"
                                    name="trade_limit"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter trade amount limit"
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="deposit_limit">
                                Deposit Limit
                                </label>
                                <input
                                    type="number"
                                    id="deposit_limit"
                                    name="deposit_limit"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter deposit limit"
                                    required
                                />
                            </div>

                           
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="withdraw_limit">
                                Withdrawal Limit
                                </label>
                                <input
                                    type="number"
                                    id="withdraw_limit"
                                    name="withdraw_limit"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter withdraw limit"
                                    required
                                />
                            </div>
                                  
                            </div>
                            
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Setting
                                </button>
                            </div>

                            {responseMessage && (
                                <p className="mt-4 text-center text-green-500">{responseMessage}</p>
                            )}
                        </form>
                    </div>




                    <div className='mb-4 w-full'>
                    
                    </div>
                </div> 
                <div className="flex flex-col items-center gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white text-black w-full min-h-[90vh]">
                    

                    <h2 className="text-2xl font-semibold leading-tight tracking-wide">Timer Profit</h2>
                    
                    <div className="w-full mx-auto p-6 bg-white ">
                        <form onSubmit={handleTimerProfitSubmit} >
                            <div className='grid grid-cols-3 gap-4'>
                         
                         
                            
                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="timer">
                                Delivery Time
                                </label>
                                <input
                                    type="text"
                                    id="timer"
                                    name="timer"
                                    value={timerData.timer}
                                    onChange={handleTimerChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter time"
                                    required
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="profit">
                               Profit Level
                                </label>
                                <input
                                    type="number"
                                    id="profit"
                                    name="profit"
                                    value={timerData.profit}
                                    onChange={handleTimerChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter profit level"
                                    required
                                />
                            </div>

                            <div className="mb-4 w-full">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="mini_usdt">
                                Minimum USDT
                                </label>
                                <input
                                    type="number"
                                    id="mini_usdt"
                                    name="mini_usdt"
                                    value={timerData.mini_usdt}
                                    onChange={handleTimerChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Minimum USDT"
                                />
                            </div>
                            </div>
                            <div className="mb-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add Item
                                </button>
                            </div>
                            
                        </form>
                        <table className="min-w-full border border-gray-300">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Time</th>
                                    <th className="py-2 px-4 border-b">Profit</th>
                                    <th className="py-2 px-4 border-b">Minimum USDT</th>
                                    <th className="py-2 px-4 border-b">Action</th>
                                </tr>
                                </thead>
                                <tbody className="text-center">
                                {timerProfits?.map((timerProfit, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">
                                    {timerProfit.timer}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                    {timerProfit?.profit}
                                    </td>
                                    <td className="py-2 px-4 border-b">{timerProfit?.mini_usdt}</td>
                                    <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => openModal(timerProfit.id)}
                                        className={`text-xs text-white py-1 px-2 rounded bg-red-600 hover:bg-red-700 `}
                                    >
                                        Delete
                                    </button>
                                        </td>
                                  
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                    </div>




                    
                </div> 
            </div>
            <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Timer Profit"
        description="This action cannot be undone."
      />
        </div>
    );
};

export default Settings;