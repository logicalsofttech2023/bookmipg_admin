import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-js-pagination";


const UpcomingBooking = () => {
  const [bookingList, setBookingList] = useState([]);
  const [count, setCount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const token = secureLocalStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBookingList();
  }, [activePage, searchValue]);

  let getBookingList = () => {
    setIsLoading(true); // Start loading
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllBookingsInAdmin?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}&status=upcoming`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCount(res?.data?.bookings?.length);
        setBookingList(res.data.bookings);
        setTotalPages(res?.data?.totalPages || 1);
      })
      .catch((error) => {
        console.log("Server error", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderBookingData = (booking, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="fw-bold">{adjustedIndex}</td>
        <td><span style={{ fontSize: "12px" , color: "#fff", fontWeight: 900 }} className="badge bg-success" >{booking?.bookingId}</span></td>

        <td>
          <Link className="title-color hover-c1 d-flex align-items-center gap-2">
            <img
              src={
                booking?.user?.profileImage?.trim()
                  ? `${process.env.REACT_APP_BASE_URL}${booking.user.profileImage}`
                  : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
              }
              className="avatar rounded-circle border"
              alt="Profile"
              width={40}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
              }}
            />
            <span className="fw-semibold text-primary">
              {booking?.name || "N/A"}
            </span>
          </Link>
        </td>
        <td>
          <a
            className="title-color hover-c1 fw-semibold"
            href={`tel:${booking?.number}`}
          >
            {booking?.number || "N/A"}
          </a>
        </td>
        <td className="fw-semibold text-secondary">
          {booking?.hotel?.name || "N/A"}
        </td>
        <td className="fw-semibold">
          <span
            style={{ fontWeight: "800", fontSize: "14px" }}
            className="text-success"
          >
            {booking?.checkInDate?.slice(0, 10)}
          </span>{" "}
          →{" "}
          <span
            style={{ fontWeight: "800", fontSize: "14px" }}
            className="text-danger"
          >
            {booking?.checkOutDate?.slice(0, 10)}
          </span>
        </td>
        <td>
          <span
            style={{ fontWeight: "800", fontSize: "10px" }}
            className={`badge ${
              booking.status === "pending"
                ? "bg-warning"
                : booking.status === "completed"
                ? "bg-success"
                : booking.status === "cancelled"
                ? "bg-danger"
                : "bg-primary"
            }`}
          >
            {booking.status}
          </span>
        </td>
        <td className="fw-bold text-success">₹{booking?.totalPrice}</td>
        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/Customerdetails/${booking?._id}`}
              title="View"
              className="btn btn-outline-info btn-sm square-btn"
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  // 🔹 Handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setActivePage(1);
  };

  return (
    <div>
      {/* <Header /> */}
      <div
        className="container row"
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          marginLeft: "0px",
        }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                width={20}
                src="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
                alt=""
              />
              Booking list
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="card mb-5">
            {/* 🔹 Search Input (No Form) */}
            <div className="px-3 py-4">
              <div className="row gy-2 align-items-center">
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <div className="input-group input-group-merge input-group-custom">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search here..."
                      aria-label="Search customers"
                      value={searchValue}
                      onChange={handleSearchChange} // 🔹 Live search on input change
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 🔹 Customer Table */}
            <div className="table-responsive datatable-custom">
              {isLoading ? (
                // **🔹 Loader Placeholder**
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              ) : bookingList.length > 0 ? (
                <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th>Booking Id</th>
                      <th>Customer Name</th>
                      <th>Customer Number</th>
                      <th>Hotel Name</th>
                      <th>Check-in / Check-out</th>
                      <th>Booking Status</th>
                      <th>Total Price</th>
                      <th className="text-center">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingList.map((customer, index) =>
                      renderBookingData(customer, index)
                    )}
                  </tbody>
                </table>
              ) : (
                // **🔹 No Data Placeholder**
                <div className="text-center p-4">
                  <img
                    className="mb-3 w-160"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                    alt="No Data"
                  />
                  <p className="mb-0 order-stats__subtitle">No Booking Found</p>
                </div>
              )}

              {/* 🔹 Pagination */}
              <div className="d-flex justify-content-center mt-4">
                {totalPages > 1 && (
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={totalPages * itemsPerPage}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                    disabled={isLoading} // Disable pagination while loading
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingBooking