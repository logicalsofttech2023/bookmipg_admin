import React, { useEffect, useState } from "react";
import Header from "../Header";
import "../sidebar.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Chip,
  Box,
  Paper,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  FaCheckCircle,
  FaHotel,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const HotelDetail = () => {
  let token = secureLocalStorage.getItem("token");
  const [adminVerify, setAdminVerify] = useState();
  const [hotel, setHotelData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getHotelData();
  }, [adminVerify]);

  let getHotelData = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getByHotelId`, {
        params: { hotelId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setHotelData(res?.data?.hotel);
        setAdminVerify(res?.data?.hotel?.adminVerify);
      })
      .catch((error) => {
        console.log("Server Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      getHotelData();

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
              {hotel.name}
            </h2>
          </div>
          <div className="row mt-20 mb-5">
            <div className="col-md-12">
              <div className="card">
                <Container sx={{ mt: 3, mb: 3 }}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: "12px",
                      bgcolor: "#f8f9fa",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Hotel Name & Verified Badge */}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap" // Ensures wrapping on small screens
                      sx={{ gap: { xs: 1, sm: 2 } }} // Adds spacing on small screens
                    >
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          letterSpacing: "0.5px",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "black",
                          fontSize: { xs: "1.3rem", sm: "1.6rem" }, // Adjust font size for mobile
                        }}
                      >
                        <FaHotel /> {hotel.name}
                      </Typography>

                      {hotel.adminVerify && (
                        <Chip
                          key="verified-badge"
                          label="Verified"
                          color="success"
                          icon={<FaCheckCircle />}
                          sx={{
                            fontWeight: 600,
                            mt: { xs: 1, sm: 0 }, // Adds margin on small screens to avoid overlap
                            fontSize: { xs: "0.75rem", sm: "0.9rem" }, // Adjusts text size for small screens
                          }}
                        />
                      )}
                    </Box>

                    {/* Address */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        mb: 1,
                        fontSize: { xs: "0.8rem", sm: "0.9rem" }, // Adjust font size for mobile
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        flexWrap: "wrap", // Ensures text wraps on small screens
                        wordBreak: "break-word", // Prevents text overflow
                      }}
                    >
                      <FaMapMarkerAlt color="red" />
                      <span>
                        {hotel.address}, {hotel.city}, {hotel.state},{" "}
                        {hotel.country}, {hotel.zipCode}
                      </span>
                    </Typography>

                    {/* Rating & Total Rooms */}
                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <FaStar color="gold" /> {hotel.rating} / 5
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 2,
                          fontSize: "0.9rem",
                          color: "#666",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <FaHotel /> {hotel.room} Rooms Available
                      </Typography>
                    </Box>

                    {/* Price Section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap", // Allows elements to wrap on small screens
                        justifyContent: { xs: "center", sm: "flex-start" }, // Center align on mobile
                        textAlign: { xs: "center", sm: "left" }, // Center text on mobile
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{
                          textDecoration: "line-through",
                          fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size for mobile
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <FaRupeeSign /> {hotel.originalPricePerNight}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="red"
                        sx={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                      >
                        <FaRupeeSign /> {hotel.pricePerNight} per night
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "gray",
                          ml: { xs: 0, sm: 1 },
                          fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        }}
                      >
                        (+₹{hotel.taxesAmount} taxes)
                      </Typography>
                    </Box>

                    {/* Availability */}
                    <Typography
                      key="availability-status"
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: hotel.isAvailable ? "green" : "red",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {hotel.isAvailable ? "✅ Available" : "❌ Not Available"}
                    </Typography>

                    {/* Description */}
                    <Typography
                      key="hotel-description"
                      variant="body2"
                      sx={{
                        mt: 2,
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        color: "#555",
                        textAlign: "justify",
                      }}
                    >
                      {hotel.description}
                    </Typography>

                    {/* Amenities */}
                    <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>
                      Amenities
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {hotel?.amenities?.map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity}
                          sx={{
                            mr: 1,
                            mb: 1,
                            bgcolor: "#e3f2fd",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            borderRadius: "6px",
                          }}
                        />
                      ))}
                    </Box>

                    {/* Facilities */}
                    <Typography variant="h6" fontWeight={600} sx={{ mt: 3 }}>
                      Facilities
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {hotel?.facilities?.map((facility, index) => (
                        <Chip
                          key={index}
                          label={facility}
                          sx={{
                            mr: 1,
                            mb: 1,
                            bgcolor: "#ffe0b2",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            borderRadius: "6px",
                          }}
                        />
                      ))}
                    </Box>

                    {/* Hotel Images */}
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ mt: 4, mb: 2 }}
                    >
                      Hotel Images
                    </Typography>
                    <ImageList
                      sx={{ width: "100%", height: "auto" }}
                      variant="quilted"
                      cols={4}
                      rowHeight={160}
                    >
                      {hotel?.images?.map((image, index) => (
                        <ImageListItem
                          key={index}
                          cols={index % 3 === 0 ? 2 : 1}
                          rows={index % 4 === 0 ? 2 : 1}
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}${image}?w=248&h=160&fit=crop&auto=format`}
                            srcSet={`${process.env.REACT_APP_BASE_URL}${image}?w=248&h=160&fit=crop&auto=format&dpr=2 2x`}
                            alt={`Hotel Image ${index + 1}`}
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop";
                            }}
                            style={{
                              borderRadius: "10px",
                              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>

                    <Typography variant="h6" fontWeight={600} sx={{ mt: 4 }}>
                      Map Location
                    </Typography>

                    {/* Address Details */}
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "#f8f9fa",
                        borderRadius: "8px",
                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                        fontSize: "0.95rem",
                        color: "#333",
                      }}
                    >
                      <Grid container spacing={2}>
                        {/* Row 1 - City & State */}
                        <Grid item xs={6}>
                          <Typography>
                            <strong>City:</strong> {hotel.city}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>State:</strong> {hotel.state}
                          </Typography>
                        </Grid>

                        {/* Row 2 - Postal Code & Country */}
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Postal Code:</strong> {hotel.zipCode}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Country:</strong> {hotel.country}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Google Map */}
                    <Box
                      sx={{
                        mt: 3,
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <iframe
                        width="100%"
                        height="300"
                        style={{ border: 0, borderRadius: "12px" }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${
                          hotel.longitude
                        }!3d${
                          hotel.latitude
                        }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v${Date.now()}`}
                      ></iframe>
                    </Box>
                  </Paper>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
