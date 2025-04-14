import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Pagination from "react-js-pagination";

const AssignCoupon = () => {
  const { id } = useParams();
  const [usersList, setUsersList] = useState([]);
  let token = secureLocalStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [count, setCount] = useState("");
  const navigate = useNavigate();
  const [couponAssignUserList, setCouponAssignUserList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  let getUserList = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getAllCustomer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUsersList(res.data.data);
        }
      })
      .catch((error) => {
        console.log("Server error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let getCouponAssignUserList = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getUsersAssignedToCoupon?page=${activePage}&limit=${itemsPerPage}&couponId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setCount(res?.data?.totalUsers);
          setCouponAssignUserList(res.data.data);
          setTotalPages(res?.data?.totalPages || 1);
          setCouponCode(res.data.coupon.code);
        }
      })
      .catch((error) => {
        console.log("Server error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserList();
    getCouponAssignUserList();
  }, [id, activePage]);

  const assignCoupon = async () => {
    const couponData = {
      userIds: selectedCustomers,
      couponId: id,
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/assignCouponToUsers`,
        couponData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Coupon assign successfully!");
          getCouponAssignUserList();
        }
      })
      .catch((error) => {
        toast.error("Error adding coupon");
        console.error("API Error:", error);
      });
  };

  const theme = useTheme();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedCustomers(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = (event, userId) => {
    event.stopPropagation(); // Stop event propagation
    event.preventDefault(); // Prevent default behavior
    setTimeout(() => {
      setSelectedCustomers((prev) => prev.filter((id) => id !== userId));
    }, 0); // Delay state update to avoid re-triggering Select
  };

  const handlePageChange = (pageNumber) => {    
    setActivePage(pageNumber);
  };

  const renderBookingData = (user, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td className="fw-bold">{adjustedIndex}</td>
        <td>
          <Link
            to={`/Customerdetails/${user?._id}`}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            <img
              src={
                user?.profileImage?.trim()
                  ? `${process.env.REACT_APP_BASE_URL}${user.profileImage}`
                  : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
              }
              className="avatar rounded-circle"
              alt="Profile"
              width={40}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
              }}
            />
            {user?.name}
          </Link>
        </td>
        <td>{user?.email || "N/A"}</td>
        <td>
          <span className="fw-semibold text-primary">{user.phone}</span>
        </td>

        <td>
        <span
            style={{ fontSize: "12px", color: "#fff", fontWeight: 900 }}
            className="badge bg-success"
          >{couponCode}</span>
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
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/coupon_setup.png"
                className="mb-1 mr-1"
                alt=""
              />
              Coupon Assign To Users
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-12 form-group coupon_type">
                      <FormControl sx={{ m: 1, width: "100%" }}>
                        <InputLabel id="customer-multiple-checkbox-label">
                          Customer
                        </InputLabel>
                        <Select
                          labelId="customer-multiple-checkbox-label"
                          id="customer-multiple-checkbox"
                          multiple
                          value={selectedCustomers}
                          onChange={handleChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-checkbox"
                              label="Customer"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => {
                                const user = usersList.find(
                                  (user) => user._id === value
                                );
                                return (
                                  <Chip
                                    key={value}
                                    label={user?.name || value}
                                    onDelete={(event) =>
                                      handleDelete(event, value)
                                    }
                                    onMouseDown={(event) =>
                                      event.stopPropagation()
                                    } // Stop Select from reopening
                                  />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {usersList.map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                              <Checkbox
                                checked={selectedCustomers.includes(user._id)}
                              />
                              <ListItemText primary={user.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center flex-wrap gap-10">
                    <button
                      type="button"
                      onClick={() => assignCoupon()}
                      className="btn btn--primary text-center"
                    >
                      Assign Coupon To User
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
                        Coupon Assign User list
                        <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                          {count}
                        </span>
                      </h5>
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
                  ) : couponAssignUserList?.length > 0 ? (
                    <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>SL</th>
                          <th>Profile</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Coupon Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {couponAssignUserList.map((data, index) =>
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
                        No Users Found
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

export default AssignCoupon;
