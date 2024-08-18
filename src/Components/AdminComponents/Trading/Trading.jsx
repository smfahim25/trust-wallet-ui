import React, { useEffect, useState } from "react";
import API_BASE_URL from "../../../api/getApiURL";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsCard from "./DetailsCard";

const Trading = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [tradeDetail, setTradeDetail] = useState(null);
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
      const response = await axios.delete(
        `${API_BASE_URL}/tradeorder/${tradeId}`
      );
      console.log("Delete response: ", response);
      setTrades((prevTrades) =>
        prevTrades.filter((trade) => trade.id !== tradeId)
      );
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

  const openDetailsModal = (trade) => {
    setTradeDetail(trade);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setTradeDetail(null);
  };

  const confirmDelete = () => {
    if (selectedTradeId) {
      handleDelete(selectedTradeId);
    }
    closeModal();
  };
  return (
    <div className="h-[80vh] overflow-x-auto overflow-y-auto">
      <table className="min-w-full border border-gray-300  ">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">UUID</th>
            <th className="py-2 px-4 border-b">Order Id</th>
            <th className="py-2 px-4 border-b">Trade Coin</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Trading Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {trades?.map((trade, index) => (
            <tr key={trade.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{trade?.user_id}</td>
              <td className="py-2 px-4 border-b">{trade?.order_id}</td>

              <td className="py-2 px-4 border-b">{trade?.trade_coin_id}</td>
              <td className="py-2 px-4 border-b">{trade?.status}</td>
              <td className="py-2 px-4 border-b">
                {new Date(trade?.created_at)
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19)}
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openDetailsModal(trade)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                >
                  Details
                </button>
                <button
                  onClick={() => openModal(trade.id)}
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
        title="Trade"
        description="This action cannot be undone."
      />
      <DetailsCard
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        details={tradeDetail}
      />

      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} /> */}
    </div>
  );
};

export default Trading;
