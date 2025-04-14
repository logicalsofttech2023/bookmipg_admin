import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-js-pagination"; // Import the Pagination component

const Customerlist = () => {
  const [customerList, setCustomerList] = useState([]);
  const [count, setCount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const token = secureLocalStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerList();
  }, [activePage, searchValue]);

  let getCustomerList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllUsers?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCount(res?.data?.data?.length);
        setCustomerList(res.data.data);
        setTotalPages(res?.data?.totalPages || 1);
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  

  const renderCustomerData = (customer, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;

    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td>
          <Link
            to={`/Customerdetails/${customer?._id}`}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            <img
              src={
                customer?.profileImage?.trim()
                  ? `${process.env.REACT_APP_BASE_URL}${customer.profileImage}`
                  : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
              }
              
              className="avatar rounded-circle"
              alt="Profile"
              width={40}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
              }} 
              />
            {customer?.name}
          </Link>
        </td>
        <td>
          <div className="mb-1">
            <strong>
              <a
                className="title-color hover-c1"
                href={`mailto:${customer?.email}`}
              >
                {customer?.email?.length > 15
                  ? customer?.email?.slice(0, 15) + `...`
                  : customer?.email}
              </a>
            </strong>
          </div>
          <a className="title-color hover-c1" href={`tel:${customer?.phone}`}>
            {customer?.phone}
          </a>
        </td>
        <td>
          {customer?.createdAt?.slice(0, 10)}{" "}
          {customer?.createdAt?.slice(11, 16)}
        </td>
        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/Customerdetails/${customer?._id}`}
              title="View"
              className="btn btn-outline-info btn-sm square-btn"
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
          <form>
            <input
              type="hidden"
              name="_token"
              defaultValue="5201ifIgVXHshEaS9xR5L76fdJ1eBw8H5dYCuDvv"
              autoComplete="off"
            />
            <input type="hidden" name="_method" defaultValue="delete" />
          </form>
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
              Customer list
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
              {customerList.length > 0 ? (
                <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th>Customer name</th>
                      <th>Contact info</th>
                      <th>Registered info</th>
                      <th className="text-center">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList.map((customer, index) =>
                      renderCustomerData(customer, index)
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="text-center p-4">
                  <img
                    className="mb-3 w-160"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                    alt="No Data"
                  />
                  <p className="mb-0 order-stats__subtitle">No Data Found</p>
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
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerlist;
