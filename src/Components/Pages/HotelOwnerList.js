import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
import toast, { Toaster } from "react-hot-toast";

const HotelOwnerList = () => {
  const [count, setCount] = useState();
  const [hotelOwnerData, setHotelOwnerData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const token = secureLocalStorage.getItem("token");
  const [totalPages, setTotalPages] = useState(1);
  const [adminVerify, setAdminVerify] = useState();

  useEffect(() => {
    getHotelOwner();
  }, [activePage, searchValue]);

  let getHotelOwner = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllOwners?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCount(res?.data?.data?.length);
        setHotelOwnerData(res.data.data);
        setTotalPages(res?.data?.totalPages || 1);
        setAdminVerify(res?.data?.data?.adminVerify);
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

  const handleVerifyChange = async (userId, e) => {
    const newStatus = e.target.value === "true";
    setAdminVerify(newStatus);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/verifyUserByAdmin`,
        { userId, adminVerify: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Status Update Successfully`);

      console.log("Verification Updated:", response.data);
    } catch (error) {
      console.error("Error updating verification:", error);
      alert("Failed to update verification status");
      setAdminVerify(!newStatus); // Revert UI if API fails
    }
  };
  const renderOwnerData = (owner, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td>
          <div className="d-flex align-items-center gap-10 w-max-content">
            {owner?.profileImage === null ? (
              <img
                width={50}
                className="avatar rounded-circle"
                src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f140b5c50.png"
                alt=""
              />
            ) : (
              <img
                width={50}
                className="avatar rounded-circle"
                src={`${process.env.REACT_APP_BASE_URL}` + owner?.profileImage}
                alt=""
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
                }}
              />
            )}

            <div>
              <Link to={`/hotelOwnerDetail/${owner?._id}`} className="title-color">
                {owner?.name}
              </Link>
              <br />
              <span className="text-danger"></span>
            </div>
          </div>
        </td>
        <td>
          <Link to={`/hotelOwnerDetail/${owner?._id}`} title="View" className="title-color">
            {owner?.phone}
          </Link>
        </td>
        <td>
          <div className="mb-1">
            <strong>
              <a
                className="title-color hover-c1"
                href={`mailto:${owner?.email}`}
              >
                {owner?.email}
              </a>
            </strong>
          </div>
        </td>
        <td>
          <select
            className="form-control"
            value={adminVerify}
            onChange={(e) => {
              handleVerifyChange(owner?._id, e);
            }}
          >
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </select>
        </td>
        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/hotelOwnerDetail/${owner?._id}`}
              title="View"
              className="btn btn-outline-info btn-sm square-btn"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      {/* <Header /> */}
      <Toaster />
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
                src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
                alt=""
              />
              Vendor List
              <span className="badge badge-soft-dark radius-50 fz-12">
                {count}
              </span>
            </h2>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
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
                <div className="table-responsive">
                  {hotelOwnerData.length > 0 ? (
                    <table
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Mobile Number</th>
                          <th>Email</th>
                          <th>Status</th>

                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotelOwnerData.map((owner, index) =>
                          renderOwnerData(owner, index)
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
                      <p class="mb-0 order-stats__subtitle">No Vendor found</p>
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
                <div className="table-responsive mt-4">
                  <div className="px-4 d-flex justify-content-center justify-content-md-end"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOwnerList;
