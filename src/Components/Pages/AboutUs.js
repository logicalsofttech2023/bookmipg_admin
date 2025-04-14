import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import e from "cors";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState("");
  const [title1, setTitle1] = useState("");
  const [content, setContent] = useState("");
  const [text1, setText1] = useState("");

  const token = secureLocalStorage.getItem("token");

  const submitForm = (event) => {
    event.preventDefault();

    const dataAbout = {
      type: "about",
      content: content ? content : aboutData?.content,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}api/admin/policyUpdate`,
        dataAbout,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
            getAbout();
            toast.success("About update success")
        }
      })
      .catch((error) => {
        console.log("Server error", error);
      });
  };

  const getAbout = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/admin/getPolicy`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { type: "about" },
      })
      .then((res) => {
        //toast.success("Faq Data Updated Successfully");
        setAboutData(res.data.policy);
        setContent(res.data.policy.content || "");
      })
      .catch((error) => {
        console.log("Server Error", error);
      });
  };
  useEffect(() => {
    getAbout();
  }, [0]);
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
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                  width={20}
                  src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
                  alt=""
                />
                About Us
              </h2>
            </div>

            <div className="row mb-5">
              <div className="col-md-12 mb-3">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us</h2>
                  </div>

                  <form className="card" onSubmit={submitForm}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <ReactQuill
                                value={content}
                                onChange={(value) => setContent(value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary "
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="col-md-12">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for Vendor</h2>
                  </div>

                  <form className="card" onSubmit={submitForm1}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title1}
                                onChange={(e) => setTitle1(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <ReactQuill value={text1} onChange={setText1} />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
