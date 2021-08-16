import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { ProfileStyle } from "./Profile.style";
import { UserOutlined, EditFilled } from "@ant-design/icons";
import UploadImage from "../../components/UploadImage";

function Profile(props) {
  const { user } = useContext(AuthContext);
  const [displayImagePopup, setDisplayImagePopup] = useState(false);
  const [profilePic, setProfilePic] = useState(false);
  const history = useHistory();

  return user ? (
    <ProfileStyle>
      <UploadImage
        setImg={setProfilePic}
        shouldDisplay={displayImagePopup}
        setShouldDisplay={setDisplayImagePopup}
        onImageChanged={() => {
          setDisplayImagePopup(false);
        }}
      />
      <div className="header">
        {/* <img src=""/> */}
        <div className="pic-container">
          <UserOutlined className="pic"></UserOutlined>
          <div className="badge" onClick={() => setDisplayImagePopup(true)}>
            <EditFilled />
          </div>
        </div>
        <div className="name-container">
          <div className="name">
            {user.firstName} {user.lastName}
          </div>
          <div className="email">{user.email}</div>
        </div>
      </div>
      <table>
        <tr>
          <td className="key">Role</td>
          <td className="value">Role Goes Here</td>
        </tr>
        <tr>
          <td className="key">Subscription Type</td>
          <td className="value">Premium</td>
        </tr>
        <tr>
          <td className="key">Mobile</td>
          <td className="value">{user.mobile}</td>
        </tr>
      </table>
      <div className="dashboard-btn" onClick={() => history.push("dashboard")}>
        Dashboard
      </div>
    </ProfileStyle>
  ) : (
    <Redirect to="login" />
  );
}

export default Profile;
