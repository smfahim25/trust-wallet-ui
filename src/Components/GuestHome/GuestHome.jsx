import React from 'react';
import './GuestHome.css';

const GuestHome = () => {
    return (
        <div>
            <div
                className="main"
                style={{
                    backgroundImage: "url('https://meta24trade.pro/wp-content/themes/cryptolanding/assets/images/background.png')",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat"
                }}
                >
        <div className="img-top">
            <a href="https://meta24trade.pro/" className="custom-logo-link" rel="home" aria-current="page">
                <img width="56" height="56" src="https://meta24trade.pro/wp-content/uploads/2024/07/logo.png" className="custom-logo" alt="TrustPro" decoding="async"/>
            </a> 
            <div className="theme-title">
                <span>TrustPro</span>
            </div>
        </div>
        <div className="content-title">
            <span>Get Trust Wallet</span>
        </div>
        <div className="content-subtitle">
            The easiest and most secure crypto wallet
        </div>
        <div className="intro_list">
            <div className="intro_item">
                <i className="icon_select dashicons dashicons-yes"></i>
                <span>Store all your crypto and NFTs in one place</span>
            </div>
            <div className="intro_item">
                <i className="icon_select dashicons dashicons-yes"></i>
                <span>Trade 500+ assets on DEXes and earn interest</span>
            </div>
            <div className="intro_item">
                <i className="icon_select dashicons dashicons-yes"></i>
                <span>No Coinbase account required</span>
            </div>
        </div>
        
        <div className="intro_img">
            <img className="img_phone" src="https://meta24trade.pro/wp-content/themes/cryptolanding/assets/images/front_image.png" alt=""/>
        </div>

        <div className="download_actions">
            <a href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&amp;hl=en" target="_blank" rel='noreferrer'>
                <img src="https://meta24trade.pro/wp-content/themes/cryptolanding/assets/images/google_play.png" alt=""/>
            </a>
            <a href="https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/" target="_blank" rel='noreferrer'>
                <img src="https://meta24trade.pro/wp-content/themes/cryptolanding/assets/images/apple_store.png" alt=""/>
            </a>
        </div>
    </div>
        </div>
    );
};

export default GuestHome;