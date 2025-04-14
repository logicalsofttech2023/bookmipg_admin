import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Profile = () => {
  let navigate = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [adminData, setAdminData] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let logout = () => {
    secureLocalStorage.removeItem("token");
    navigate("/");
  };

  let token = secureLocalStorage.getItem("token");

  const getAdminData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAdminDetail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAdminData(response.data.data);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setPassword(response.data.data.password);
        setConfirmPassword(response.data.data.password);
      }
    } catch (error) {
      console.log("Server error", error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const handleSubmit = async () => {
    const data = {
      name,
      email,
      phone,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/updateAdminDetail`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Admin information update successfully");
        setAdminData(response.data.data);
      }
    } catch (error) {
      console.log("Server error", error);
    }
  };

  const changePassword = () => {
    const data = {
      newPassword: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/resetAdminPassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };
  return (
    <div>
      <Toaster />
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="page-header">
              <div className="row align-items-end">
                <h2 className="col-sm mb-2 mb-sm-0 h1 mb-0 text-capitalize d-flex align-items-center gap-2">
                  <img
                    width={20}
                    src="https://6valley.6amtech.com/public/assets/back-end/img/profile_setting.png"
                    alt
                  />
                  Settings
                </h2>
                <div className="col-sm-auto">
                  <Link onClick={logout} className="btn btn--primary" to="/">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <div className="navbar-vertical navbar-expand-lg mb-3 mb-lg-5">
                  <button
                    type="button"
                    className="navbar-toggler btn btn-block btn-white mb-3"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                    aria-controls="navbarVerticalNavMenu"
                    data-toggle="collapse"
                    data-target="#navbarVerticalNavMenu"
                  >
                    <span className="d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0">Nav menu</span>
                      <span className="navbar-toggle-default">
                        <i className="tio-menu-hamburger" />
                      </span>
                      <span className="navbar-toggle-toggled">
                        <i className="tio-clear" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card mb-3 mb-lg-5">
                  <div className="card-header">
                    <h2 className="card-title h4">Basic Information</h2>
                  </div>
                  <div className="card-body">
                    <div className="row form-group">
                      <label
                        htmlFor="firstNameLabel"
                        className="col-sm-3 col-form-label input-label"
                      >
                        Full name
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group input-group-sm-down-break">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="firstNameLabel"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row form-group">
                      <label
                        htmlFor="phoneLabel"
                        className="col-sm-3 col-form-label input-label"
                      >
                        Phone{" "}
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="js-masked-input form-control"
                          name="phone"
                          id="phoneLabel"
                          placeholder="+x(xxx)xxx-xx-xx"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <label
                        htmlFor="newEmailLabel"
                        className="col-sm-3 col-form-label input-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="newEmailLabel"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn--primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 mb-lg-5">
                  <div className="card-header">
                    <h4 className="card-title">Change your password</h4>
                  </div>
                  <div className="card-body">
                    {/* New Password */}
                    <div className="row form-group">
                      <label className="col-sm-3 col-form-label input-label">
                        New password
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="row form-group">
                      <label className="col-sm-3 col-form-label input-label">
                        Confirm password
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            name="confirm_password"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="d-flex justify-content-end">
                      <button type="button" onClick={changePassword} className="btn btn--primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
                <div id="stickyBlockEndPoint" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
