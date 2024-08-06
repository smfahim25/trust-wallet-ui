import React, { useState } from 'react';
import CryptoMarket from '../CryptoMarket/CryptoMarket';
import belIcon from '../../Assets/images/icon_bell.svg';
import headerLogo from '../../Assets/images/header-logo.png';
import menuIcon from '../../Assets/images/icon_menu.svg';
import ForexMarket from '../ForexMarket/ForexMarket';
import { Link } from 'react-router-dom';

function Home() {
  const [activeTab, setActiveTab] = useState('crypto');
  const handleSwitch = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="user-panel">
      <div className="top-wrapper">
        <div className="top_container">
          <div className="header" style={{ background: 'none' }}>
            <a className="header-item" id="notify-icon" href="/notification">
              <img src={belIcon} alt="Notification Icon" />
            </a>
            <div className="header-item" id="menu-icon">
              <img src={menuIcon} alt="Menu Icon" />
            </div>
          </div>
          <h1 className="title">
            {"TrustPro"}
          </h1>
          <div className="an_title">
            <div className="info">
              <div className="desc">
                <p>Your one-stop solution
                for trading needs.</p>
                
              </div>
            </div>
            <img
              src={headerLogo}
              className="shap"
              alt="Header Logo"
            />
          </div>
        </div>
        <div className="placeholder"></div>
      </div>

      <div className="market_container">
        <div className="market_title">
          <span>Market</span>
        </div>
        <div className="market_tabs">
        <Link to={"/account"}>
          <div className="tab_item active" data-tab_name="crypto-market">
            Crypto Currency
          </div>
          </Link>
          
          <Link to={"/editprofile"}>
          <div className="tab_item" data-tab_name="forex-market">
          Foreign Exchange
          </div>
          
          </Link>
          <Link to={"/guest"}>
          <div className="tab_item" data-tab_name="metal-market">
          Precious Metal
          </div>
          </Link>
          <div className="tab_item"
          onClick={() => handleSwitch('top')}
           data-tab_name="top-market">
            Top
          </div>
        </div>

        
        <div id="crypto-market">
        {activeTab === 'crypto' && (
        <CryptoMarket />
          
      )}
          
        </div>

        <div id="forex-market">
          {/* <ForexMarket/> */}
        </div>
        <div id="metal-market">
            
        </div>
        <div id="top-market">
        {activeTab === 'top' && (
       
          <h2>I am top market</h2>
        
      )}
      </div>
        
      </div>

      <div id="news" className="news_container">
        <div className="home_news">
          <div className="news_title">
            <div className="fs-20 ff_InterSemiBold">News</div>
            <div className="more fc-1652F0 fs-16"> More </div>
          </div>
          <div className="news_content"></div>
          <div className="news_tips ff_NunitoSemiBold">
            News does not represent investment advice
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
