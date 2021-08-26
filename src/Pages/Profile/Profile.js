import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { ProfileStyle } from "./Profile.style";
import { UserOutlined, EditFilled } from "@ant-design/icons";
import UploadImage from "../../components/UploadImage";
import EditableField from "../../components/atoms/EditableField";
import { setDetails } from "../../api/users";
import storage from "../../api/storage";
import ErrorContext from "../../context/ErrorContext";

function Profile(props) {
  const { user, setUser } = useContext(AuthContext);
  const [displayImagePopup, setDisplayImagePopup] = useState(false);
  const { setErrorMsg } = useContext(ErrorContext);
  const [saving, setSaving] = useState(false);

  const history = useHistory();

  console.log(user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.mobile);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setMobile(user.mobile);
    setProfilePic(user.profilePic);
  }, [user]);

  const handleSave = async (profilePic = profilePic) => {
    setSaving(true);
    console.log("saving");
    const token = await storage.getToken();
    setDetails(token, firstName, lastName, user.email, user.password, mobile, {
      profilePic: profilePic,
    }).then((response) => {
      setSaving(false);
      if (response.data && response.data.status) {
        console.log(response);
        const User = {
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          email: user.email,
          // temporary later will store securely
          password: user.password,
          profilePic: profilePic,
        };

        // storing token and user object
        storage.storeUser(User);

        // setting user globlly
        setUser(user);
        window.location.reload();
      } else {
        setErrorMsg(response.problem);
      }
    });
  };

  return user ? (
    <ProfileStyle>
      {displayImagePopup && (
        <UploadImage
          project_id={false}
          setImg={setProfilePic}
          setShouldDisplay={setDisplayImagePopup}
          onImageChanged={(profilePic) => {
            setDisplayImagePopup(false);
            // auto saving as prev img got deleted
            handleSave(profilePic);
          }}
        />
      )}
      <div className="header">
        <div className="pic-container">
          {profilePic ? (
            <img src={profilePic} className="pic" />
          ) : (
            <UserOutlined className="pic-holder"></UserOutlined>
          )}
          <div className="badge" onClick={() => setDisplayImagePopup(true)}>
            <EditFilled />
          </div>
        </div>
        <div className="name-container">
          <div className="name">
            <div className="first-name">
              <EditableField
                inputClassName="edit-input first-name-input"
                text={firstName}
                setText={setFirstName}
                EditTrigger={(props) => (
                  <div {...props} className="badge name-badge">
                    <EditFilled />
                  </div>
                )}
              />
            </div>
            <div className="last-name">
              <EditableField
                inputClassName="edit-input last-name-input"
                text={lastName}
                setText={setLastName}
                EditTrigger={(props) => (
                  <div {...props} className="badge name-badge">
                    <EditFilled />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="email">{user.email}</div>
        </div>
      </div>
      <div className="table-container">
        <table>
          <tr>
            <td className="key">Subscription Type</td>
            <td className="value">Premium</td>
          </tr>
          <tr>
            <td className="key">Mobile</td>
            <td className="value mobile">
              <EditableField
                text={mobile}
                setText={setMobile}
                inputClassName="edit-input"
                EditTrigger={(props) => (
                  <></>
                  // <div className="badge badge-mobile" {...props}>
                  //   <EditFilled />
                  // </div>
                )}
              />
            </td>
          </tr>
        </table>
      </div>
      <div className="btn-container">
        <div className="btn dashboard-btn" onClick={handleSave}>
          <span>{saving ? "Saving" : "Save"}</span>
          <span
            class="loader"
            style={{
              display: saving ? "inline-block" : "none",
              marginLeft: "1rem",
            }}
          />
        </div>
        <div
          className="btn dashboard-btn"
          onClick={() => history.push("dashboard")}
        >
          Dashboard
        </div>
      </div>
    </ProfileStyle>
  ) : (
    <Redirect to="login" />
  );
}

export default Profile;
