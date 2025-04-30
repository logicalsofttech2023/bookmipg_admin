import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import "./manubar.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdFeedback, MdLocalOffer } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { BiCategory, BiMoneyWithdraw } from "react-icons/bi";
import { FaUserTie, FaHotel, FaClipboardList } from "react-icons/fa";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineTag } from "react-icons/ai";
import { AiOutlineEnvironment } from "react-icons/ai";

const Sidebarr = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    updateScreenWidth();

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  const [sidebarStatus, setSidebarStatus] = useState(() => {
    return localStorage.getItem("setstatus");
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarStatus(localStorage.getItem("setstatus"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div>
      {screenWidth >= 767 ? (
        <aside
          className="sidenav"
          style={{ textAlign: "left", paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="navbar-vertical-container ">
            <div className="navbar-vertical-footer-offset pb-0">
              <div className="">
                <ul className="navbar-nav navbar-nav-lg nav-tabs pb-10">
                  <li className="navbar-vertical-aside-has-menu ">
                    <Sidebar className="bg-info example">
                      <Menu style={{ width: "100%" }}>
                        <MenuItem
                          component={<Link to="/home" />}
                          icon={
                            <i
                              class="fa fa-home"
                              style={{ color: "white", fontSize: "20px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "#073b74",
                            color: "white",
                          }}
                        >
                          {" "}
                          Dashboard{" "}
                        </MenuItem>
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                            height: "39px",
                          }}
                        >
                          {" "}
                          USER MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          label="Customers"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUser style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/customerlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Customer List{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/customerreview" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Customer Reviews
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUserTie style={{ fontSize: "20px" }} />}
                          label="Vendor"
                        >
                          <MenuItem
                            component={<Link to="/hotelOwnerList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Vendor List{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          HOTEL MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaHotel style={{ fontSize: "20px" }} />}
                          label="Vendor Hotel"
                        >
                          <MenuItem
                            component={<Link to="/hotelList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Hotel List{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/approvedHotels" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Approved Hotels{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/deniedHotels" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Denied Hotels{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          BOOKING MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <FaClipboardList style={{ fontSize: "20px" }} />
                          }
                          label="Bookings"
                        >
                          <MenuItem
                            component={<Link to="/pendingBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Pending{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/completedBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Completed{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/cancelledBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Cancelled{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/upcomingBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Upcoming{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          COUPON MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <FaClipboardList style={{ fontSize: "20px" }} />
                          }
                          label="Coupon"
                        >
                          <MenuItem
                            component={<Link to="/coupon" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Coupon List{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          BEST CITY{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <AiOutlineEnvironment
                              style={{ fontSize: "20px" }}
                            />
                          }
                          label="Best City"
                        >
                          <MenuItem
                            component={<Link to="/bestCity" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Best City List{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          SETTINGS{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "20px" }} />}
                          label="Setting"
                        >
                          <MenuItem
                            component={<Link to="/aboutUs" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            About us{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/termcondition" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Term & Conditions{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/privacypolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Privacy & Policy{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/contactus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Contact us{" "}
                          </MenuItem>
                        </SubMenu>
                      </Menu>
                    </Sidebar>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      ) : null}

      {sidebarStatus === "true" ? (
        <aside
          className="sidenav1"
          style={{
            textAlign: "left",
            paddingLeft: "0px",
            marginTop: "60px",
          }}
        >
          <div className="navbar-vertical-container ">
            <div className="navbar-vertical-footer-offset pb-0">
              <div className="">
                <ul
                  style={{ overflow: "scroll", height: "450px" }}
                  className="navbar-nav navbar-nav-lg nav-tabs pb-10"
                >
                  <li className="navbar-vertical-aside-has-menu ">
                    <Sidebar className="bg-info example">
                      <Menu style={{ width: "100%" }}>
                        <MenuItem
                          component={<Link to="/home" />}
                          icon={
                            <i
                              class="fa fa-home"
                              style={{ color: "white", fontSize: "20px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "#073b74",
                            color: "white",
                          }}
                        >
                          {" "}
                          Dashboard{" "}
                        </MenuItem>
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                            height: "39px",
                          }}
                        >
                          {" "}
                          USER MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          label="Customers"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUser style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/customerlist" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Customer List{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/customerreview" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Customer Reviews
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUserTie style={{ fontSize: "20px" }} />}
                          label="Vendor"
                        >
                          <MenuItem
                            component={<Link to="/hotelOwnerList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Vendor List{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          HOTEL MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaHotel style={{ fontSize: "20px" }} />}
                          label="Vendor Hotel"
                        >
                          <MenuItem
                            component={<Link to="/hotelList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Hotel List{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/approvedHotels" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Approved Hotels{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/deniedHotels" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Denied Hotels{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          BOOKING MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <FaClipboardList style={{ fontSize: "20px" }} />
                          }
                          label="Bookings"
                        >
                          <MenuItem
                            component={<Link to="/pendingBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Pending{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/completedBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Completed{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/cancelledBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Cancelled{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/upcomingBooking" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Upcoming{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          COUPON MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <FaClipboardList style={{ fontSize: "20px" }} />
                          }
                          label="Coupon"
                        >
                          <MenuItem
                            component={<Link to="/coupon" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Coupon List{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          BEST CITY{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <AiOutlineEnvironment
                              style={{ fontSize: "20px" }}
                            />
                          }
                          label="Best City"
                        >
                          <MenuItem
                            component={<Link to="/bestCity" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "33px",
                            }}
                          >
                            {" "}
                            Best City List{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "20px" }} />}
                          label="Setting"
                        >
                          <MenuItem
                            component={<Link to="/deliverycharge" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Tax & Fare charge{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/aboutus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            About us{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/termcondition" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Term & Conditions{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/privacypolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Privacy & Policy{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/contactus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Contact us{" "}
                          </MenuItem>
                        </SubMenu>
                      </Menu>
                    </Sidebar>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
};

export default Sidebarr;
