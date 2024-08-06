import React, { useState } from 'react';

const mockUserWallet = true; // Simulate session presence
const mockUserData = {
  name: "John Doe",
  walletId: "1234567890"
};

const Notification = () => {
  const [activeTab, setActiveTab] = useState('Notice');
  const handleSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {mockUserWallet && (
        <div className="transaction">
          <div className="page-header">
            <img src="/assets/images/icon_back.svg" alt="Back" className="back" />
            <span className="title over-line-1">Notification</span>
            <img id="menu-icon" src="/assets/images/icon_menu_b.svg" alt="Menu" className="menu_img" />
          </div>
          <div className="switch_container">
            <div className="switch_content">
              <div
                className={`switch_item ${activeTab === 'Notice' ? 'active' : ''}`}
                onClick={() => handleSwitch('Notice')}
              >
                Notice
              </div>
              <div
                className={`switch_item ${activeTab === 'Message' ? '' : 'active'}`}
                onClick={() => handleSwitch('Message')}
              >
                Message
              </div>
            </div>
          </div>

    
          <div id="transaction-deposit" style={{ display: activeTab === 'Notice' ? 'block' : 'none' }}>
            <div className="main_container">
              <div className="main_content">
                <div className="no_data_content ff_NunitoSemiBold" style={{ minHeight: 'calc(-260px + 100vh)' }}>
                  <img src="/assets/images/img_nodata.png" alt="No Data" className="img_no_data" />
                  <div>No Notification</div>
                </div>
              </div>
            </div>
          </div>

          <div id="transaction-withdraw" style={{ display: activeTab === 'Message' ? 'block' : 'none' }}>
            <div className="main_container">
              <div className="main_content">
                <div className="no_data_content ff_NunitoSemiBold" style={{ minHeight: 'calc(-260px + 100vh)' }}>
                  <img src="/assets/images/img_nodata.png" alt="No Data" className="img_no_data" />
                  <div>No Messages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
