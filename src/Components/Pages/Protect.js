import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Protect = (props) => {
  let { ComponentName } = props;

  let navigate = useNavigate();

  useEffect(() => {
    let status = secureLocalStorage.getItem("token");

    if (!status) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ComponentName />
    </>
  );
};

export default Protect;