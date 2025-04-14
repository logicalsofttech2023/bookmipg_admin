import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./sidebar.css";
import { Link } from "react-router-dom";
import Sidebarr from "./Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaCalendarCheck, FaHotel, FaStore, FaUsers } from "react-icons/fa";

const Home = () => {
  const [dashboardData, setDashboardData] = useState();
  const token = secureLocalStorage.getItem("token");

  useEffect(() => {
    Dashboard();
  }, [0]);
  let Dashboard = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/dashboardData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };

  return (
    <div>
      {/* <Header /> */}
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="page-header pb-0 border-0 mb-3 mt-3 ">
              <div className="flex-between row align-items-center mx-1">
                <div>
                  <h2 className="page-header-title">Dashboard</h2>
                  
                </div>
              </div>
            </div>
            <div className="row g-2" id="order_stats">
              <div className="col-sm-6 col-lg-3">
                <Link to={"/pendingBooking"}>
                  <div className="business-analytics">
                    <div className="business-analytics__icon-wrapper">
                      <FaCalendarCheck
                        size={20}
                        color="#4CAF50"
                        className="business-analytics__img"
                      />
                    </div>
                    <h5 className="business-analytics__subtitle">
                      Total Bookings
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashboardData?.totalBookings}
                    </h2>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link to={"/hotelOwnerList"}>
                  <div className="business-analytics">
                    <div className="business-analytics__icon-wrapper">
                      <FaStore
                        size={20}
                        color="#4CAF50"
                        className="business-analytics__img"
                      />
                    </div>
                    <h5 className="business-analytics__subtitle">
                      Total Vendors
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashboardData?.totalHotelOwner}
                    </h2>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link to={"/hotelList"}>
                  <div className="business-analytics">
                    <div className="business-analytics__icon-wrapper">
                      <FaHotel
                        size={20}
                        color="#4CAF50"
                        className="business-analytics__img"
                      />
                    </div>
                    <h5 className="business-analytics__subtitle">
                      Total Hotels
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashboardData?.totalHotel}
                    </h2>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link to="/customerlist">
                  <div className="business-analytics">
                    <div className="business-analytics__icon-wrapper">
                      <FaUsers
                        size={20}
                        color="#4CAF50"
                        className="business-analytics__img"
                      />
                    </div>
                    <h5 className="business-analytics__subtitle">
                      Total Customers
                    </h5>
                    <h2 className="business-analytics__title">
                      {dashboardData?.totalUsers}
                    </h2>
                  </div>
                </Link>
              </div>

              <div className="col-sm-6 col-lg-3 ">
                <Link
                  className="order-stats order-stats_pending"
                  to="/pendingBooking"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Pending</h6>
                  </div>
                  <span className="order-stats__title">
                    {dashboardData?.totalPendingBooking}
                  </span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_confirmed"
                  to="/completedBooking"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Completed</h6>
                  </div>
                  <span className="order-stats__title">
                    {dashboardData?.totalCompletedBooking}
                  </span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_packaging"
                  to="/cancelledBooking"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/packaging.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Cancelled</h6>
                  </div>
                  <span className="order-stats__title">
                    {dashboardData?.totalCancelledBooking}
                  </span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_out-for-delivery"
                  to="/upcomingBooking"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Upcoming</h6>
                  </div>
                  <span className="order-stats__title">
                    {dashboardData?.totalUpcomingBooking}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
