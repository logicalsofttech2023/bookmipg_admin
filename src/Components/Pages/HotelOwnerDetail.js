import React, { useEffect, useState } from "react";
import "../sidebar.css";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Modal, ModalDialog, Typography, Button } from "@mui/joy";
import { Stack, AspectRatio, Card } from "@mui/joy";
import toast, { Toaster } from "react-hot-toast";

const HotelOwnerDetail = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const token = secureLocalStorage.getItem("token");
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewData, setReviewData] = useState([]);
  const [selectedReview, setSelectedReview] = useState("");
  const [open, setOpen] = useState(false);
  const [adminVerify, setAdminVerify] = useState();

  useEffect(() => {
    fetchOwnerData();
    fetchBookingData();
    fetchReviewData();
  }, [activePage, searchValue, activeTab]);

  let fetchOwnerData = () => {
    
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getHotelsByOwnerIdInAdmin?page=${activePage}&limit=${itemsPerPage}&search=${searchValue}&ownerId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOwnerData(res.data.data);
        setTotalPages(res?.data?.totalPages || 1);
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };

  const fetchBookingData = () => {
    setIsLoading(true);

    let status =
      activeTab !== "overview" && activeTab !== "review" ? activeTab : "";

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}api/admin/getAllBookingByOwnerId`,
        {
          params: {
            page: activePage,
            limit: itemsPerPage,
            search: searchValue,
            ownerId: id,
            ...(status && { status }),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBookingData(res.data.bookings);
      })
      .catch((error) => {
        console.log("Server error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchReviewData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getAllReviewByOwnerId`, {
        params: {
          page: activePage,
          limit: itemsPerPage,
          search: searchValue,
          ownerId: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);

        setReviewData(res?.data?.reviews);
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };

  const handleShowReview = (review) => {
    setSelectedReview(review);
    setOpen(true);
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
          <img
            src={`${process.env.REACT_APP_BASE_URL}${data.user.profileImage}`}
            alt="Profile"
            style={{ width: "40px", borderRadius: "50%", marginRight: "8px" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
            }}
          />
          {data.user.name}
        </td>
        <td>{data?.user?.phone}</td>
        <td>{data?.hotel?.name}</td>
        <td>{data?.room}</td>
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
        <td>₹{data.totalPrice}</td>
        <td>
          <span
            className={`badge ${
              data.status === "pending"
                ? "bg-warning"
                : data.status === "completed"
                ? "bg-success"
                : data.status === "cancelled"
                ? "bg-danger"
                : "bg-primary"
            }`}
          >
            {data.status}
          </span>
        </td>
        <td>
          {new Date(data?.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>

        <td>
          <div className="d-flex justify-content-center gap-10">
            <Link
              className="btn btn-outline--primary btn-sm edit square-btn"
              title="View"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>{" "}
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  const handleVerifyChange = async (hotelId, e) => {
    const newStatus = e.target.value === "true";
    setAdminVerify(newStatus);

    try {
      setIsLoading(true); // Start loading
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
      fetchOwnerData();

      console.log("Verification Updated:", response.data);
    } catch (error) {
      console.error("Error updating verification:", error);
      alert("Failed to update verification status");
      setAdminVerify(!newStatus); // Revert UI if API fails
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <Toaster />
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4" style={{ paddingLeft: "0px" }}>
          {/* <Sidebarr /> */}
        </div>

        <div
          className="col-lg-9 col-md-8"
          style={{ paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  alt="Vendor"
                />
                Vendor details
              </h2>
            </div>

            <div className="page-header border-0 mb-4">
              <div className="hs-nav-scroller-horizontal overflow-auto">
                <ul className="nav nav-tabs d-flex flex-wrap justify-content-center">
                  {[
                    { key: "overview", label: "Hotel Overview" },
                    { key: "pending", label: "Pending Booking" },
                    { key: "upcoming", label: "Upcoming Booking" },
                    { key: "cancelled", label: "Cancelled Booking" },
                    { key: "completed", label: "Completed Booking" },
                    { key: "review", label: "Review" },
                  ].map((tab) => (
                    <li className="nav-item" key={tab.key}>
                      <button
                        className={`nav-link ${
                          activeTab === tab.key ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tab Content */}
            {["pending", "upcoming", "cancelled", "completed"].includes(
              activeTab
            ) && (
              <div className="container row">
                <div
                  className="col-lg-12 col-md-8"
                  style={{ marginTop: "30px" }}
                >
                  <div className="card mb-5">
                    <div className="table-responsive datatable-custom">
                      <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>#</th>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            <th>Contact Info</th>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>CreatedAt</th>
                            <th className="text-center">View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isLoading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <div
                                  className="spinner-border text-primary m-5"
                                  role="status"
                                >
                                  <span className="visually-hidden"></span>
                                </div>
                              </td>
                            </tr>
                          ) : bookingData.length > 0 ? (
                            bookingData.map((booking, index) =>
                              renderBookingData(booking, index)
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan="7"
                                className="text-center text-muted"
                              >
                                <h3 className="m-5">
                                  No {activeTab} bookings found.
                                </h3>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <div>
                {Array.isArray(ownerData) && ownerData.length > 0 ? (
                  ownerData.map((hotel, index) => (
                    <div key={index} className="card card-top-bg-element mb-5">
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-3 justify-content-between">
                          <div className="media flex-column flex-sm-row gap-3" style={{ width: "100%" }}>
                            <img
                              className="avatar avatar-170 rounded-0"
                              src={`${process.env.REACT_APP_BASE_URL}${hotel.images[0]}`}
                              alt={hotel.name}
                            />
                            <div className="media-body">
                              <h2 className="mb-2 pb-1">{hotel.name}</h2>
                              <p>{hotel.address}</p>
                              <div className="d-flex gap-3 flex-wrap mb-3 lh-1">
                                <div className="review-hover d-flex gap-2 align-items-center">
                                  <i
                                    className="fa fa-star"
                                    aria-hidden="true"
                                  ></i>
                                  <span>{hotel.rating}</span>
                                </div>
                                <span className="border-left" />
                                <span className="text-dark">
                                  {hotel.room} Rooms
                                </span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mt-3" style={{ gap: "30px"}}>
                                <Link
                                style={{ width: "50%"}}
                                  to={`https://www.google.com/maps/place/${hotel?.latitude},${hotel?.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline--primary px-4"
                                >
                                  <i
                                    className="fa fa-globe"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  View Map
                                </Link>

                                <select
                                style={{ width: "50%"}}
                                  className="form-control"
                                  value={hotel.adminVerify}
                                  onChange={(e) =>
                                    handleVerifyChange(hotel?._id, e)
                                  }
                                >
                                  <option value="true">Verified</option>
                                  <option value="false">Not Verified</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="d-flex gap-3 flex-wrap flex-lg-nowrap">
                          <div className="border p-3 w-170">
                            <h6>Total Price/Night:</h6>
                            <h3 className="text-primary fs-18">
                              ₹{hotel.pricePerNight}
                            </h3>
                          </div>
                          <div className="row gy-3 flex-grow-1 w-100">
                            <div className="col-sm-6 col-xxl-3">
                              <h4 className="mb-3">Amenities</h4>
                              <ul>
                                {hotel.amenities.map((amenity, index) => (
                                  <li key={index}>{amenity}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-sm-6 col-xxl-3">
                              <h4 className="mb-3">Facilities</h4>
                              <ul>
                                {hotel.facilities.map((facility, index) => (
                                  <li key={index}>{facility}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading or No Data Available</p>
                )}
              </div>
            )}

            {activeTab === "review" && (
              <div className="container">
                <div className="row justify-content-center">
                  <div
                    className="col-lg-12 col-md-10"
                    style={{ marginTop: "30px" }}
                  >
                    <div className="card mb-5">
                      <div className="table-responsive">
                        <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                          <thead className="thead-light thead-50 text-capitalize">
                            <tr>
                              <th>#</th>
                              <th>Hotel Name</th>
                              <th>Customer Name</th>
                              <th>Image</th>
                              <th>Rating</th>
                              <th>Review</th>
                              <th>Created At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isLoading ? (
                              <tr>
                                <td colSpan="7" className="text-center py-5">
                                  <div
                                    className="spinner-border text-primary"
                                    role="status"
                                  >
                                    <span className="visually-hidden"></span>
                                  </div>
                                </td>
                              </tr>
                            ) : reviewData.length > 0 ? (
                              reviewData.map((data, index) => (
                                <tr key={data?._id || index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <a
                                      href="#"
                                      className="title-color hover-c1"
                                    >
                                      {data?.hotel?.name || "N/A"}
                                    </a>
                                  </td>
                                  <td className="d-flex align-items-center">
                                    <img
                                      src={`${process.env.REACT_APP_BASE_URL}${data?.user?.profileImage}`}
                                      alt="Profile"
                                      className="rounded-circle me-2"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        marginRight: "5px",
                                      }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
                                      }}
                                    />
                                    {data?.user?.name || "Unknown"}
                                  </td>
                                  <td>
                                    <Stack direction="row" spacing={1}>
                                      {data?.images?.length > 0 ? (
                                        data.images.map((image, index) => (
                                          <Card
                                            key={index}
                                            variant="outlined"
                                            sx={{ width: 50, height: 50 }}
                                          >
                                            <AspectRatio ratio="1">
                                              <img
                                                src={`${process.env.REACT_APP_BASE_URL}${image}`}
                                                alt={`Review Image ${
                                                  index + 1
                                                }`}
                                                onError={(e) => {
                                                  e.target.onerror = null;
                                                  e.target.src =
                                                    "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png";
                                                }}
                                              />
                                            </AspectRatio>
                                          </Card>
                                        ))
                                      ) : (
                                        <Card
                                          variant="outlined"
                                          sx={{ width: 50, height: 50 }}
                                        >
                                          <AspectRatio ratio="1">
                                            <img
                                              src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                                              alt="Placeholder"
                                            />
                                          </AspectRatio>
                                        </Card>
                                      )}
                                    </Stack>
                                  </td>
                                  <td>{data?.rating || "N/A"}</td>
                                  <td>
                                    {data?.review?.length > 10 ? (
                                      <span>
                                        {data.review.substring(0, 10)}...
                                        <a
                                          href="#"
                                          onClick={() =>
                                            handleShowReview(data.review)
                                          }
                                          className="text-primary ms-1"
                                        >
                                          Read more
                                        </a>
                                      </span>
                                    ) : (
                                      data?.review || "No review provided"
                                    )}
                                  </td>

                                  <td>
                                    {data?.createdAt
                                      ? new Date(
                                          data?.createdAt
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      : "N/A"}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="7"
                                  className="text-center text-muted"
                                >
                                  <h3 className="m-5">No reviews found.</h3>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <Modal open={open} onClose={() => setOpen(false)}>
                          <ModalDialog
                            variant="outlined"
                            layout="center"
                            sx={{
                              width: 400,
                              borderRadius: "md",
                              padding: 3,
                              boxShadow: "lg",
                            }}
                          >
                            <Typography level="h5">Full Review</Typography>
                            <Typography sx={{ mt: 2 }}>
                              {selectedReview}
                            </Typography>
                            <Button
                              variant="solid"
                              color="primary"
                              fullWidth
                              sx={{ mt: 3 }}
                              onClick={() => setOpen(false)}
                            >
                              Close
                            </Button>
                          </ModalDialog>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default HotelOwnerDetail;
