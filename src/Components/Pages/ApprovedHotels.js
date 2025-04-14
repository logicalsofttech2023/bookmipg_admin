import React, { useEffect, useState } from "react";
import Header from "../Header";
import "../sidebar.css";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";

const ApprovedHotels = () => {
  const [hotelList, setHotelList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [count, setCount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  let token = secureLocalStorage.getItem("token");
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [adminVerify, setAdminVerify] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getHotelData();
    fetchVendors();
  }, [activePage, searchValue, adminVerify]);
  let getHotelData = () => {
    setIsLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllHotelsByInAdmin?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}&adminVerify=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCount(res?.data?.hotels.length);
        setHotelList(res?.data?.hotels);
        setTotalPages(res?.data?.totalPages || 1);
      })
      .catch((error) => {
        console.log("Server Error", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  let fetchVendors = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getAllVendors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setVendorsList(res?.data?.data);
      })
      .catch((error) => {
        console.log("Server Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setActivePage(1);
  };

  const handleVerifyChange = async (hotelId, e) => {
    const newStatus = e.target.value === "true";
    setAdminVerify(newStatus);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/verifyHotelByAdmin`,
        { hotelId, adminVerify: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Status Update Successfully`);
      getHotelData();
      fetchVendors();

      console.log("Verification Updated:", response.data);
    } catch (error) {
      console.error("Error updating verification:", error);
      alert("Failed to update verification status");
      setAdminVerify(!newStatus); // Revert UI if API fails
    } finally {
      // setIsLoading(false); // Stop loading
    }
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
          <div className="mt-3 mb-3">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
                alt=""
              />
              Hotel List
              <span class="badge badge-soft-dark radius-50 fz-14 ml-1">
                {count}
              </span>
            </h2>
          </div>
          <div className="card">
            <div className="card-body">
              <form>
                <input type="hidden" defaultValue={0} name="status" />
                <div className="row gx-2">
                  <div className="col-12">
                    <h4 className="mb-3">Filter Hotel</h4>
                  </div>
                  <div className="col-sm-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label className="title-color" htmlFor="store">
                        Vendor
                      </label>
                      <select
                        name="seller_id"
                        className="form-control text-capitalize"
                        onChange={(e) => setSelectedVendor(e.target.value)}
                        style={{ width: "100%" }}
                      >
                        <option value="">All Vendors</option>
                        {vendorsList?.map((vendor) => (
                          <option key={vendor._id} value={vendor._id}>
                            {vendor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row mt-20 mb-5">
            <div className="col-md-12">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <form action="#" method="GET">
                        <div className="input-group input-group-merge input-group-custom">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
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
                      </form>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  {isLoading ? (
                    <div className="text-center p-4">
                      <img
                        className="mb-3 w-160"
                        src="https://i.gifer.com/ZZ5H.gif"
                        alt="Loading..."
                      />
                      <p className="mb-0 order-stats__subtitle">
                        Loading hotels...
                      </p>
                    </div>
                  ) : hotelList?.length > 0 ? (
                    <table
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>Hotel Name</th>
                          <th>Address</th>
                          <th>City</th>
                          <th>Price Per Night</th>
                          <th>Rating</th>
                          <th>Availability</th>
                          <th>Status</th>
                          <th className="text-center __w-5px">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotelList.map((hotel, index) => (
                          <tr key={hotel._id}>
                            <th scope="row">{index + 1}</th>

                            <td>
                              <Link
                                to={`/hotelDetail/${hotel._id}`}
                                className="media align-items-center gap-2 w-max-content"
                              >
                                {hotel.images.length > 0 ? (
                                  <img
                                    src={`${process.env.REACT_APP_BASE_URL}${hotel.images[0]}`}
                                    className="avatar border"
                                    alt={hotel.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
                                    }}
                                  />
                                ) : (
                                  <img
                                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                                    className="avatar border"
                                    alt="No Image"
                                  />
                                )}
                                <span className="media-body title-color hover-c1">
                                  {hotel.name.length > 20
                                    ? hotel.name.slice(0, 20) + "..."
                                    : hotel.name}
                                </span>
                              </Link>
                            </td>
                            <td>{hotel.address}</td>
                            <td>{hotel.city}</td>
                            <td>₹ {hotel.pricePerNight}</td>
                            <td>{hotel.rating}</td>
                            <td>
                              {hotel.isAvailable ? (
                                <label className="badge badge-soft-success">
                                  Available
                                </label>
                              ) : (
                                <label className="badge badge-soft-danger">
                                  Not Available
                                </label>
                              )}
                            </td>
                            <td>
                              <select
                                className="form-control"
                                value={hotel.adminVerify}
                                style={{ width: "100px" }}
                                onChange={(e) =>
                                  handleVerifyChange(hotel?._id, e)
                                }
                              >
                                <option value="true">Verified</option>
                                <option value="false">Not Verified</option>
                              </select>
                            </td>

                            <td>
                              <div className="d-flex gap-10">
                                <Link
                                  onClick={() =>
                                    secureLocalStorage.setItem(
                                      "hotelid",
                                      hotel._id
                                    )
                                  }
                                  className="btn btn-outline-info btn-sm square-btn"
                                  title="View"
                                  to={`/hotelDetail/${hotel._id}`}
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center p-4">
                      <img
                        className="mb-3 w-160"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                        alt="No Hotels Found"
                      />
                      <p className="mb-0 order-stats__subtitle">
                        No hotels found
                      </p>
                    </div>
                  )}
                </div>
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

                <div className="table-responsive mt-4">
                  <div className="px-4 d-flex justify-content-lg-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedHotels;
