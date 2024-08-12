import React from "react";
import Header from "../Header/Header";

const Profile = (props) => {
  return (
    <div class="main">
      <div class="profile">
        <Header pageTitle={"Profile"} />
        <div id="profile-edit">
          <div class="main_container">
            <div class="main_content">
              <div class="title title-profile">
                <div class="left">
                  <span class="left_icon"></span>
                  <span>Edit Profile</span>
                </div>
              </div>

              <div class="input_content ff_NunitoSemiBold">
                <div class="address">
                  <label>UID</label>
                  <input
                    type="text"
                    disabled
                    value="5465"
                    class="address_input"
                  />
                </div>
                <div class="address">
                  <label>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value="Name Example"
                    placeholder="Full Name"
                    class="address_input"
                  />
                </div>
                <div class="address">
                  <label>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value="email@example.com"
                    placeholder="Email Address"
                    class="address_input"
                  />
                </div>
                <div class="address">
                  <label>Referral UID</label>
                  <input
                    type="text"
                    disabled
                    value="548751654"
                    class="address_input"
                  />
                </div>
                <div class="address">
                  <label>Wallet Address</label>
                  <input
                    type="text"
                    disabled
                    value={props?.walletId}
                    class="address_input"
                  />
                </div>
              </div>
              <div class="flex justify-center">
                <button type="button" class="send_action fs-16 ff_NunitoBold">
                  Send now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
