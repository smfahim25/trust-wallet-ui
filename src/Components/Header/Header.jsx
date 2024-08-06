import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data
const appName = "TrustPro";
const userUid = "12345-67890";
const creditScore = 600;
const smartContractLink = "#";
const knowledgeMenuItems = [
    { name: "Knowledge Item 1", link: "#" },
    { name: "Knowledge Item 2", link: "#" },
    { name: "Knowledge Item 3", link: "#" },
];
const user = { isReferral: true };

const Header = () => {
    // State for collapsing knowledge base
    const [knowledgeExpanded, setKnowledgeExpanded] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu =() =>{
        setToggleMenu(!toggleMenu);
    }

    const toggleKnowledgeCollapse = () => {
        setKnowledgeExpanded(!knowledgeExpanded);
    };

    const toggleSettingsPopup = () => {
        setSettingsVisible(!settingsVisible);
    };

     // Ref for the menu
     const menuRef = useRef(null);

     // Close the menu if clicked outside
     useEffect(() => {
         const handleClickOutside = (event) => {
             if (menuRef.current && !menuRef.current.contains(event.target)) {
                 setToggleMenu(false);
             }
         };
 
         document.addEventListener('mousedown', handleClickOutside);
         return () => document.removeEventListener('mousedown', handleClickOutside);
     }, []);
 

    return (
        <>
        <div className="page-header">
                <img src="/assets/images/icon_back.svg" alt="Back" className="back" />
                <span className="title over-line-1">Notification</span>
                <img onClick={()=>handleToggleMenu()} id="menu-icon" src="/assets/images/icon_menu_b.svg" alt="Menu" className="menu_img" />
            </div>
            {
                toggleMenu && (
                <div id='main-menu'>
                    
                    <div className="menu-overlay"></div>
                    <div className="next-popup menu-popup" style={{ width: '80%', height: '100%', zIndex: 2016 }} ref={menuRef}>
                        <div className="menu-box">
                            <div className="welcome_content flex align-center">
                                <div className="flex1">
                                    <span className="fs-16 ff_NunitoSemiBold fc-1652F0 appname">{appName}</span>
                                    <div className="line-center">
                                        <div className="fc-353F52 m-t-5">UID: {userUid}</div>
                                    </div>
                                </div>
                                <div className="score link-text-color fs-14 ff_NunitoSemiBold">
                                    <span className="fs12">Credit:</span> {creditScore}
                                </div>
                            </div>
                            <a href={smartContractLink} className="join flex justify-center align-center">
                                <div className="key">
                                    <img src="/assets/images/keyIcon.png" alt="Key Icon" />
                                </div>
                                <span className="over-line-1">Join smart contract</span>
                            </a>
                            <div className="fns">
                                <h2 className="fs16 ff_NunitoSemiBold m-b-20">Functions</h2>
                                <Link className="items flex align-center" to="/">
                                    <img src="/assets/images/menu/home.png" alt="Home" className="m-r-10" />
                                    <span className="over-line-1">Trading</span>
                                </Link>
                                <Link className="items flex align-center" to="/account">
                                    <img src="/assets/images/menu/accounts.png" alt="Account" className="m-r-10" />
                                    <span className="over-line-1">Account</span>
                                </Link>
                                <Link className="items flex align-center" to="/transaction">
                                    <img src="/assets/images/menu/transaction.png" alt="Transaction" className="m-r-10" />
                                    <span className="over-line-1">Transaction</span>
                                </Link>
                                <Link className="items flex align-center" to="/profit-stat">
                                    <img src="/assets/images/menu/profits.png" alt="Profit Statistics" className="m-r-10" />
                                    <span className="over-line-1">Profit Statistics</span>
                                </Link>
                                <div className="flex align-center">
                                    <div className="know-collapse menu-collapse">
                                        <div className="know menu-collapse-item">
                                            <div
                                                role="button"
                                                tabIndex="0"
                                                aria-expanded={knowledgeExpanded}
                                                className="menu-cell menu-cell--clickable menu-cell--borderless menu-collapse-item__title menu-collapse-item__title--borderless"
                                                onClick={toggleKnowledgeCollapse}
                                            >
                                                <div className="menu-cell__title">
                                                    <div className="items flex align-center">
                                                        <img src="/assets/images/menu/knowledge.png" alt="Knowledge Base Module" className="m-r-10" />
                                                        <span className="over-line-1">Knowledge Base Module</span>
                                                    </div>
                                                </div>
                                                <img src="/assets/images/icon_arrow_down.svg" alt="Arrow Down" className="menu-icon menu-cell__right-icon" />
                                            </div>
                                            {knowledgeExpanded && (
                                                <div className="menu-collapse-item__wrapper">
                                                    <div className="menu-collapse-item__content">
                                                        <div className="content">
                                                            {knowledgeMenuItems.map((item, index) => (
                                                                <Link key={index} className="know-item" to={item.link}>
                                                                    {item.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="items flex align-center chat-menu">
                                    <img src="/assets/images/menu/chat.png" alt="Chat" className="m-r-10" />
                                    <span className="over-line-1">Chat</span>
                                </div>
                                <div className="items flex align-center menu-settings" onClick={toggleSettingsPopup}>
                                    <img src="/assets/images/menu/settings.png" alt="Settings" className="m-r-10" />
                                    <span className="over-line-1">Settings</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            

            {settingsVisible && (
                <div id="setting-menu-popup">
                    <div className="ssb-overlay" style={{ zIndex: 2017 }}></div>
                    <div className="setting_popup set-up ssb-popup ssb-popup--center" style={{ zIndex: 2018, height: 'auto' }}>
                        <div className="title fs-16 fc-353F52 ff_NunitoSemiBold flex justify-between">
                            <div className="title-text">Set up</div>
                            <div className="close" onClick={toggleSettingsPopup}>
                                <img src="/assets/images/icon_close.svg" alt="Close" />
                            </div>
                        </div>
                        <div className="set_content">
                            <Link className="set_item" to="/profile">
                                <div className="set_info">
                                    <img src="/assets/images/menu/profile.svg" alt="Profile" />
                                    <span>Profile</span>
                                </div>
                                <div className="set_arrow">
                                    <img src="/assets/images/icon_menu_arrow.svg" className="arrow" alt="Arrow" />
                                </div>
                            </Link>
                            {user.isReferral && (
                                <>
                                    <Link className="set_item" to="/referral-list">
                                        <div className="set_info">
                                            <img src="/assets/images/menu/users.svg" alt="Referral List" />
                                            <span>Referral List</span>
                                        </div>
                                        <div className="set_arrow">
                                            <img src="/assets/images/icon_menu_arrow.svg" className="arrow" alt="Arrow" />
                                        </div>
                                    </Link>
                                    <Link className="set_item" to="/referral-history">
                                        <div className="set_info">
                                            <img src="/assets/images/menu/money-bag.svg" alt="Referral History" />
                                            <span>Referral History</span>
                                        </div>
                                        <div className="set_arrow">
                                            <img src="/assets/images/icon_menu_arrow.svg" className="arrow" alt="Arrow" />
                                        </div>
                                    </Link>
                                </>
                            )}
                            <div className="set_item">
                                <div className="set_info">
                                    <img src="/assets/images/icon_set_menu_2.svg" alt="Notification" />
                                    <span>Notification</span>
                                </div>
                                <div className="set_arrow">
                                    <img src="/assets/images/icon_menu_arrow.svg" className="arrow" alt="Arrow" />
                                </div>
                            </div>
                            <div className="set_item">
                                <div className="set_info">
                                    <img src="/assets/images/icon_set_menu_4.svg" alt="English" />
                                    <span>English</span>
                                </div>
                                <div className="set_arrow"></div>
                            </div>
                            <div className="set_item">
                                <div className="set_info">
                                    <img src="/assets/images/icon_delete.svg" alt="Clear Cache" />
                                    <span>Clear cache</span>
                                </div>
                                <div className="set_arrow">
                                    <img src="/assets/images/icon_menu_arrow.svg" className="arrow" alt="Arrow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
