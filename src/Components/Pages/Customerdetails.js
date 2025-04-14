import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useParams } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
const Customerdetails = () => {
  const [customerData, setCustomerData] = useState();
  const [count, setCount] = useState();
  const [customerBookingData, setCustomerBookingData] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  let { id } = useParams();
  const token = secureLocalStorage.getItem("token");
  useEffect(() => {
    getCustomerData();
  }, [0]);
  let getCustomerData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getUserByIdInAdmin?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCustomerData(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getCustomerBookData();
  }, [activePage, searchValue]);
  let getCustomerBookData = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getBookingByUserIdInAdmin?userId=${id}&page=${activePage}&limit=${itemsPerPage}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCount(res?.data?.bookings?.length);
        setCustomerBookingData(res?.data?.bookings);
        setTotalPages(res?.data?.totalPages || 1);
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setActivePage(1);
  };

  const renderBookingData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr>
        <td>{adjustedIndex}</td>
        <td>
          <a href="#" className="title-color hover-c1">
            {data?.bookingId}
          </a>
        </td>
        <td>
          <a href="#" className="title-color hover-c1">
            {data?.hotel?.name?.slice(0, 5)}
          </a>
        </td>
        <td> {data?.totalPrice}</td>
        <td>
          {new Date(data?.checkInDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>
        <td>
          {new Date(data?.checkOutDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>

        <td> {data?.status}</td>
        <td>
          {new Date(data?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>
        
        
      </tr>
    );
  };
  return (
    <div>
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
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
              Customer Details
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>

          <div className="row" id="printableArea">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-4 d-flex align-items-center gap-2">
                    <img
                      src="https://6valley.6amtech.com/public/assets/back-end/img/seller-information.png"
                      alt=""
                      
                    />
                    Customer
                  </h4>
                  <div className="media">
                    <div className="mr-3">
                      {customerData?.profileImage === " " ? (
                        <img
                          className="avatar rounded-circle avatar-70"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                          alt="Image"
                          
                        />
                      ) : (
                        <img
                          className="avatar rounded-circle avatar-70"
                          src={
                            `${process.env.REACT_APP_BASE_URL}` +
                            customerData?.profileImage
                          }
                          alt="Image"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
                          }}    
                        />
                      )}
                    </div>
                    <div className="media-body d-flex flex-column gap-1">
                      <span className="title-color hover-c1">
                        <strong>
                          {customerData?.name}
                        </strong>
                      </span>
                      <span className="title-color">
                        <strong>{count > 0 ? count : 0} </strong>Booking
                      </span>
                      <span className="title-color">
                        <strong>{customerData?.mobile_number}</strong>
                      </span>
                      <span className="title-color">{customerData?.email}</span>
                    </div>
                    <div className="media-body text-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-5" id="printableArea">
            <div className="col-lg-12 mb-3 mb-lg-0">
              <div className="card">
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
                <div className="table-responsive datatable-custom">
                  {customerBookingData?.length > 0 ? (
                    <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>#</th>
                          <th>Booking ID</th>
                          <th>Hotel Name</th>
                          <th>Total Price</th>

                          <th>CheckInDate</th>
                          <th>CheckOutDate</th>
                          <th>Status</th>
                          <th>CreatedAt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerBookingData.map((customer, index) =>
                          renderBookingData(customer, index)
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <div class="text-center p-4">
                      <img
                        class="mb-3 w-160"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                        alt="Image Description"
                      />
                      <p class="mb-0 order-stats__subtitle">No Booking found</p>
                    </div>
                  )}
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
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerdetails;
