import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../api/getApiURL";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteModal from "../DeleteModal/DeleteModal";
import DepositModal from "./DepositModal";
import ImageViewer from "./ImageViewer";
import { useUser } from "../../../context/UserContext";

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);
  const { setLoading } = useUser();
  const [/*error,*/ setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepositId, setSelectedTradeId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isImgView, setIsImgView] = useState(false);
  const [depositDetail, setDepositDetail] = useState(null);
  const [refreshDeposit, setRefreshDeposit] = useState(false);

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
    if (refreshDeposit) {
      fetchDepositInfo();
    }
  }, [refreshDeposit, setLoading, setError]);

  const handleDelete = async (depositID) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deposits/${depositID}`
      );
      console.log("Delete response: ", response);
      setDeposits((prevDeposits) =>
        prevDeposits.filter((deposit) => deposit.id !== depositID)
      );
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
  const openDetailsModal = (trade) => {
    setDepositDetail(trade);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setDepositDetail(null);
  };
  const openImageViewer = (deposit) => {
    setIsImgView(true);
    setDepositDetail(deposit);
  };

  const closeImgViewer = () => {
    setIsImgView(false);
    setDepositDetail(null);
  };

  const handleUpdateSuccess = () => {
    setRefreshDeposit(!refreshDeposit);
  };

  return (
    <div className="h-[80vh] overflow-x-auto overflow-y-auto">
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
        <tbody className="text-center">
          {deposits?.map((deposit, index) => (
            <tr key={deposit.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{deposit?.user_uuid}</td>
              <td className="py-2 px-4 border-b">{deposit?.coin_name}</td>
              <td className="py-2 px-4 border-b">{deposit?.amount}</td>
              <td
                onClick={() => openImageViewer(deposit)}
                className="py-2 px-4 border-b"
              >
                <div className="bg-white w-[40px] h-[40px] border-2 overflow-hidden">
                  <img
                    src={`${API_BASE_URL}/${deposit?.documents}`}
                    className="w-full h-full object-cover"
                    alt="Documents"
                  />
                </div>
              </td>
              <td className="py-2 px-4 border-b">{deposit.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openDetailsModal(deposit)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal(deposit.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                >
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
        title="Deposit"
        description="This action cannot be undone."
      />
      <DepositModal
        title="Deposit"
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        details={depositDetail}
        onUpdateSuccess={handleUpdateSuccess}
      />

      <ImageViewer
        isOpen={isImgView}
        onClose={closeImgViewer}
        details={depositDetail}
      />

      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  );
};

export default Deposits;
