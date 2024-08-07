import React, { useState, useEffect } from 'react';
import imgNoData from "../../Assets/images/img_nodata.png";

const Withdraw = ({ openTransactionHistory }) => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    // Mock data for withdrawals
    const mockWithdrawals = [
      {
        id: 1,
        sender: 'Eve',
        receiver: 'Frank',
        amount: 150,
        transactionHash: 'ghi789',
        status: 'Completed',
      },
      {
        id: 2,
        sender: 'Grace',
        receiver: 'Heidi',
        amount: 250,
        transactionHash: 'jkl012',
        status: 'Pending',
      },
    ];

    setWithdrawals(mockWithdrawals);
  }, []);

  return (
    <div id="transaction-withdraw" style={{ display: 'block' }}>
      <div className="main_container">
        <div className="main_content">
          <div className="title title-transaction">
            <div className="left">
              <span className="left_icon"></span>
              <span>Withdraw</span>
            </div>
          </div>
          <div>
            {withdrawals.length <= 0 ? (
              <div
                className="no_data_content ff_NunitoSemiBold"
                style={{ minHeight: 'calc(-260px + 100vh)' }}
              >
                <img
                  src={imgNoData}
                  alt="No Data"
                  className="img_no_data"
                />
                <div>No Data</div>
              </div>
            ) : (
              <div className="table-tab-container">
                <div className="table-tab-content">
                  <table className="transaction-history withdraw-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.map((withdrawal) => (
                        <tr key={withdrawal.id}>
                          <td>{withdrawal.sender}</td>
                          <td>{withdrawal.receiver}</td>
                          <td>{withdrawal.amount}</td>
                          <td>{withdrawal.status}</td>
                          <td>
                            <button
                              onClick={() => openTransactionHistory(withdrawal)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
