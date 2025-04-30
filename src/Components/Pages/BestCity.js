import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";

const BestCity = () => {
  let token = secureLocalStorage.getItem("token");
  const [bestCityList, setBestCityList] = useState([]);
  const [count, setCount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [cityName, setCityName] = useState("");
  const [hotelCount, setHotelCount] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getBestCityList();
  }, [activePage, searchValue]);

  let getBestCityList = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllBestCities?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setCount(res?.data?.pagination.total);
          setBestCityList(res.data.data);
          setTotalPages(res?.data?.pagination?.pages || 1);
        }
      })
      .catch((error) => {
        console.log("Server error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderBookingData = (city, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="fw-bold">{adjustedIndex}</td>
        <td>
          <span className="fw-semibold text-primary">
            {city?.cityName || "N/A"}
          </span>
        </td>
        <td className="fw-semibold text-secondary">
          {/* Image Display */}
          {city?.image ? (
            <img
              src={`${process.env.REACT_APP_BASE_URL}${city.image}`}
              alt={city.cityName}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          ) : (
            "N/A"
          )}
        </td>
        
        <td>
          <a className="title-color hover-c1 fw-semibold">
            {city?.hotelCount || "N/A"}
          </a>
        </td>
        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/updateBestCity/${city._id}`}
              className="btn btn-outline--primary btn-sm edit"
              title="Edit"
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </Link>
  
            {/* <Link
              className="btn btn-outline-danger btn-sm delete"
              href="javascript:"
              title="Delete"
              onClick={() => deleteCity(city?._id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </Link> */}
          </div>
        </td>
      </tr>
    );
  };
  

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setActivePage(1);
  };

  const addBestCity = async () => {
    const formData = new FormData();
    formData.append("cityName", cityName);
    formData.append("hotelCount", hotelCount);
    formData.append("image", image);
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/createBestCity`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Best city added successfully!");
        }
      })
      .catch((error) => {
        toast.error("Error adding Best city");
        console.error("API Error:", error);
      });
  };

  let deleteCity = (id) => {
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
              getBestCityList();
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
              Add Best City
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="cityName"
                        className="title-color font-weight-medium d-flex"
                      >
                        City Name
                      </label>
                      <input
                        type="text"
                        name="cityName"
                        className="form-control"
                        id="cityName"
                        placeholder="City Name"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="hotelCount"
                        className="title-color font-weight-medium d-flex"
                      >
                        Hotel Count
                      </label>
                      <input
                        type="number"
                        name="hotelCount"
                        className="form-control"
                        id="hotelCount"
                        placeholder="Hotel Count"
                        value={hotelCount}
                        onChange={(e) => setHotelCount(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-lg-4 form-group">
                      <label
                        htmlFor="image"
                        className="title-color font-weight-medium d-flex"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center flex-wrap gap-10">
                    <button
                      type="button"
                      onClick={() => addBestCity()}
                      className="btn btn--primary px-4"
                    >
                      Add City
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
                        Best City list
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
                  ) : bestCityList.length > 0 ? (
                    <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>City Name</th>
                          <th>Image</th>
                          <th>Hotel Count</th>
                          <th className="text-center">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bestCityList.map((data, index) =>
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

export default BestCity;
