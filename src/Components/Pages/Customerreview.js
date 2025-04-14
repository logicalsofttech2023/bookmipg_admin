import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";
const Customerreview = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [count, setCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const token = secureLocalStorage.getItem("token");
  const itemsPerPage = 10;

  useEffect(() => {
    getReviewsList();
  }, [activePage, searchValue]);

  const getReviewsList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllReviewsInAdmin?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviewsData(res?.data?.reviews || []);
      setCount(res?.data?.reviews.length || 0);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (error) {
      console.error("Server error", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setActivePage(1);
  };

  const renderReviewData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td>
          <Link to={`/Customerdetails/${data?.user?._id}`} className="title-color hover-c1">
            {data?.user?.name}
          </Link>
        </td>
        <td>
          <label className="badge badge-soft-info mb-0">
            <span className="fz-12 d-flex align-items-center gap-1">
              {data?.rating} <i className="fa fa-star" aria-hidden="true"></i>
            </span>
          </label>
        </td>
        <td>
          <div style={{ whiteSpace: "pre-wrap" }}>
          {data?.review?.length > 20
        ? data?.review?.slice(0, 20) + "..."
        : data?.review}
          </div>
        </td>
        <td>{data?.createdAt?.slice(0, 10)}</td>
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
            <h2 className="h1 mb-0 text-capitalize d-flex gap-2 align-items-center">
              <img
                width={20}
                src="https://6valley.6amtech.com/public/assets/back-end/img/customer_review.png"
                alt=""
              />
              Customer reviews
            </h2>
          </div>
          <div className="card card-body">
            <div className="row border-bottom pb-3 align-items-center mb-20">
              <div className="col-sm-4 col-md-6 col-lg-8">
                <h5 className="text-capitalize d-flex gap-2 align-items-center">
                  Review Data
                  <span className="badge badge-soft-dark radius-50 fz-12">{count}</span>
                </h5>
              </div>
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
                    aria-label="Search reviews"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-20">
            <div className="table-responsive">
              {reviewsData?.length > 0 ? (
                <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Rating</th>
                      <th>Review</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>{reviewsData.map((review, index) => renderReviewData(review, index))}</tbody>
                </table>
              ) : (
                <div className="text-center p-4">
                  <img
                    className="mb-3 w-160"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                    alt="No reviews"
                  />
                  <p className="mb-0 order-stats__subtitle">No review found</p>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center mt-4">
              {totalPages > 1 && (
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={count}
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
  );
};

export default Customerreview;
