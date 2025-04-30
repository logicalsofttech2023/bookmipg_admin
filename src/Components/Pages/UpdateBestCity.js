import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const UpdateBestCity = () => {
  const { id } = useParams();
  let token = secureLocalStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [hotelCount, setHotelCount] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // For image preview

  let getCityDetail = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getBestCityById`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const city = res.data.data;
          setCityName(city?.cityName || "");
          setHotelCount(city?.hotelCount || "");
          setImage(city?.image || "");  // string hona chahiye

          setImagePreview(""); // Set the image preview
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
    getCityDetail();
  }, [id]);

  const updateBestCity = async () => {
    const formData = new FormData();
    formData.append("cityName", cityName);
    formData.append("hotelCount", hotelCount);
    if (image) {
      formData.append("image", image); // Append image if selected
    }

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/updateBestCity`,
        formData,
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Best city updated successfully!");
          setTimeout(() => {
            navigate("/bestCity");
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error("Error updating city");
        console.error("API Error:", error);
      });
  };

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4"></div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/coupon_setup.png"
                className="mb-1 mr-1"
                alt=""
              />
              Best City Update
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
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file); // Set file object
        setImagePreview(URL.createObjectURL(file)); // Local preview
      }
    }}
  />

  {/* Agar naya file select kiya hai toh */}
  {imagePreview ? (
    <div>
      <img
        src={imagePreview}
        alt="Selected Preview"
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          marginTop: "10px",
        }}
      />
    </div>
  ) : (
    /* Nahi toh backend se loaded image dikhana */
    image && typeof image === "string" && (
      <div>
        <img
          src={`${process.env.REACT_APP_BASE_URL}${image}`}
          alt="Uploaded Image"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginTop: "10px",
          }}
        />
      </div>
    )
  )}
</div>


                  </div>

                  <div className="d-flex align-items-center justify-content-center flex-wrap gap-10">
                    <button
                      type="button"
                      onClick={() => updateBestCity()}
                      className="btn btn--primary px-4"
                    >
                      Update
                    </button>
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

export default UpdateBestCity;
