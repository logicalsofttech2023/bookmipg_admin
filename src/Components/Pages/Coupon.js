import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Sidebarr from "./../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { Button } from "@mui/joy";

const Coupon = () => {
  let token = secureLocalStorage.getItem("token");
  const [couponList, setCouponList] = useState([]);
  const [count, setCount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [type, setType] = useState("public");

  useEffect(() => {
    getCouponList();
  }, [activePage, searchValue]);

  let getCouponList = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllCoupons?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}&status=completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setCount(res?.data?.totalCoupons);
          setCouponList(res.data.coupons);
          setTotalPages(res?.data?.totalPages || 1);
        }
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

  const renderBookingData = (coupon, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="fw-bold">{adjustedIndex}</td>
        <td>
          <span
            style={{ fontSize: "12px", color: "#fff", fontWeight: 900 }}
            className="badge bg-success"
          >
            {coupon?.code}
          </span>
        </td>

        <td>
          <span className="fw-semibold text-primary">
            {coupon?.discountPercentage || "N/A"}%
          </span>
        </td>
        <td>
          <a className="title-color hover-c1 fw-semibold">
            {coupon?.title || "N/A"}
          </a>
        </td>
        <td className="fw-semibold text-secondary">
          {coupon?.expiryDate
            ? new Date(coupon.expiryDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "N/A"}
        </td>
        <td className="fw-semibold text-secondary">
          {coupon?.type === "public" ? "Public" : "Assigned"}
        </td>

        <td>
          <span
            style={{ fontWeight: "800", fontSize: "10px" }}
            className={`badge ${coupon.isActive ? "bg-success" : "bg-warning"}`}
          >
            {coupon.isActive ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="fw-bold text-success">
          {coupon?.createdAt
            ? new Date(coupon.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",

                hour12: true,
              })
            : "N/A"}
        </td>
        <td className="fw-bold text-success">
          {coupon?.updatedAt
            ? new Date(coupon.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "N/A"}
        </td>
        <td>
          <div className="d-flex justify-content-center gap-2">
            {coupon?.type === "assigned" ? (
              <Link
                className="btn btn-outline-primary btn-sm"
                title="Assign Coupon"
                to={`/assignCoupon/${coupon._id}`}
              >
                Assign Coupon
              </Link>
            ) : (
              <button className="btn btn-outline-info btn-sm" disabled>
                Public Coupon
              </button>
            )}
          </div>
        </td>

        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/couponUpdate/${coupon._id}`}
              className="btn btn-outline--primary btn-sm edit"
              title="Edit"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </Link>

            <Link
              className="btn btn-outline-danger btn-sm delete"
              href="javascript:"
              title="Delete"
              onClick={() => deleteCoupon(coupon?._id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setActivePage(1);
  };

  const addCoupon = async () => {
    const couponData = {
      code,
      discountPercentage,
      title,
      description,
      expiryDate,
      type,
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/createCoupon`,
        couponData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Coupon added successfully!");
          getCouponList();
          setCode("");
          setDiscountPercentage("");
          setTitle("");
          setDescription("");
          setCustomerId("");
          setExpiryDate("");
          setType("public");
        }
      })
      .catch((error) => {
        toast.error("Error adding coupon");
        console.error("API Error:", error);
      });
  };

  let deleteCoupon = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this coupon!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}api/admin/deleteCoupon`,
            { id }, // ✅ ID pass कर रहे हैं
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              getCouponList();
              swal("Poof! Your coupon has been deleted!", {
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log("Server error", error);
          });
      } else {
        swal("Your coupon is safe!");
      }
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
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/coupon_setup.png"
                alt=""
              />
              Add Coupon
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="name"
                        className="title-color font-weight-medium d-flex"
                      >
                        Coupon Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        className="form-control"
                        id="code"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="name"
                        className="title-color font-weight-medium d-flex"
                      >
                        Discount Percentage
                      </label>
                      <input
                        type="text"
                        name="discountPercentage"
                        className="form-control"
                        id="discountPercentage"
                        placeholder="Discount Percentage"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="name"
                        className="title-color font-weight-medium d-flex"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="name"
                        className="title-color font-weight-medium d-flex"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="type"
                        className="title-color font-weight-medium d-flex"
                      >
                        Coupon Type
                      </label>
                      <select
                        name="type"
                        className="form-control"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value="public">Public</option>
                        <option value="assigned">Assigned</option>
                      </select>
                    </div>

                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="name"
                        className="title-color font-weight-medium d-flex"
                      >
                        Expire date
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        className="form-control"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center flex-wrap gap-10">
                    <button
                      type="button"
                      onClick={() => addCoupon()}
                      className="btn btn--primary px-4"
                    >
                      Add Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-20 mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row justify-content-between align-items-center flex-grow-1">
                    <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                      <h5 className="mb-0 text-capitalize d-flex gap-2">
                        Coupon list
                        <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                          {count}
                        </span>
                      </h5>
                    </div>
                    <div className="px-3 py-4">
                      <div className="row gy-2 align-items-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          {" "}
                          {/* Adjusted width for responsiveness */}
                          <div className="input-group input-group-merge input-group-custom">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i
                                  className="fa fa-search"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                            <input
                              type="search"
                              className="form-control"
                              placeholder="Search here..."
                              aria-label="Search customers"
                              value={searchValue}
                              onChange={handleSearchChange}
                              style={{ minWidth: "100px" }} // Ensures it doesn't shrink too much
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 🔹 Customer Table */}
                <div className="table-responsive datatable-custom">
                  {isLoading ? (
                    // **🔹 Loader Placeholder**
                    <div className="text-center p-4">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden"></span>
                      </div>
                    </div>
                  ) : couponList.length > 0 ? (
                    <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>Coupon Code</th>
                          <th>Discount(%)</th>
                          <th>Coupon Title</th>
                          <th>Expiry Date</th>
                          <th>Coupon Type</th>
                          <th>Status</th>
                          <th>CreatedAt</th>
                          <th>UpdatedAt</th>
                          <th className="text-center">Assign Coupon</th>

                          <th className="text-center">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {couponList.map((data, index) =>
                          renderBookingData(data, index)
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
                      <p className="mb-0 order-stats__subtitle">
                        No Booking Found
                      </p>
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
      </div>
      <div
        className="modal fade"
        id="quick-view"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div
          className="modal-dialog modal-dialog-centered coupon-details"
          role="document"
        >
          <div className="modal-content" id="quick-view-modal">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className="coupon__details">
              <div className="coupon__details-left">
                <div className="text-center">
                  <h6 className="title" id="title">
                    free delivery
                  </h6>
                  <h6 className="subtitle">
                    Code : <span id="couponCode">pcuw655ytg</span>
                  </h6>
                  <div className="text-capitalize">
                    <span>Free delivery</span>
                  </div>
                </div>
                <div className="coupon-info">
                  <div className="coupon-info-item">
                    <span>Minimum purchase :</span>
                    <strong id="min_purchase">$10.00</strong>
                  </div>
                  <div className="coupon-info-item">
                    <span>Start date : </span>
                    <span id="start_date">10th Jan 2024</span>
                  </div>
                  <div className="coupon-info-item">
                    <span>Expire date : </span>
                    <span id="expire_date">31st Dec 2027</span>
                  </div>
                  <div className="coupon-info-item">
                    <span>Discount bearer : </span>
                    <span id="expire_date">Vendor</span>
                  </div>
                </div>
              </div>
              <div className="coupon__details-right">
                <div className="coupon">
                  <img
                    src="https://6valley.6amtech.com/public/assets/back-end/img/free-delivery.png"
                    alt="Free delivery"
                    width={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
