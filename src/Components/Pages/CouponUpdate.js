import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const CouponUpdate = () => {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  let token = secureLocalStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [type, setType] = useState("");

  let getCouponDetail = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getCouponById`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const coupon = res.data.coupon;
          setCode(coupon?.code);
          setDiscountPercentage(coupon?.discountPercentage);
          setTitle(coupon?.title);
          setDescription(coupon?.description);
          setExpiryDate(coupon?.expiryDate.split("T")[0]);
          setType(coupon?.type);
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
    getCouponDetail();
  }, [id]);

  const updateCoupon = async () => {
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
        `${process.env.REACT_APP_BASE_URL}api/admin/updateCoupon`,
        couponData,
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
            toast.success("Coupon update successfully!");
            setTimeout(() => {
                navigate("/coupon");
            }, 2000);
          
        }
      })
      .catch((error) => {
        toast.error("Error adding coupon");
        console.error("API Error:", error);
      });
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
              Coupon update
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
                  <div className="d-flex align-items-center justify-content-end flex-wrap gap-10">
                    <button
                      type="button"
                      onClick={() => updateCoupon()}
                      className="btn btn--primary px-4"
                    >
                      Submit
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

export default CouponUpdate;
