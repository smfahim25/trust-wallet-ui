import React, { useState, useEffect } from 'react';
import imgNoData from "../../Assets/images/img_nodata.png";

const Deposit = ({ openTransactionHistory }) => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    // Mock data for deposits
    const mockDeposits = [
      {
        id: 1,
        sender: 'Alice',
        receiver: 'Bob',
        amount: 100,
        transactionHash: 'abc123',
        status: 'Completed',
      },
      {
        id: 2,
        sender: 'Charlie',
        receiver: 'Dave',
        amount: 200,
        transactionHash: 'def456',
        status: 'Pending',
      },
    ];

    setDeposits(mockDeposits);
  }, []);

  return (
    <div id="transaction-deposit">
      <div className="main_container">
        <div className="main_content">
          <div className="title title-transaction">
            <div className="left">
              <span className="left_icon"></span>
              <span>Deposit</span>
            </div>
          </div>
          <div>
            {deposits.length <= 0 ? (
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
                  <table className="transaction-history deposit-table">
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
                      {deposits.map((deposit) => (
                        <tr key={deposit.id}>
                          <td>{deposit.sender}</td>
                          <td>{deposit.receiver}</td>
                          <td>{deposit.amount}</td>
                          <td>{deposit.status}</td>
                          <td>
                            <button
                              onClick={() => openTransactionHistory(deposit)}
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

export default Deposit;
