import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Profile from "./Components/Pages/Profile";
import Login from "./Components/Login";
import Coupon from "./Components/Pages/Coupon";
import Protect from "./Components/Pages/Protect";
import AboutUs from "./Components/Pages/AboutUs";
import TermCondition from "./Components/Pages/TermsAndConditions";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import ContactUs from "./Components/Pages/ContactUs";
import Error from "./Components/Error";

// Hotel Booking routes
import CustomerList from "./Components/Pages/Customerlist";
import CustomerDetails from "./Components/Pages/Customerdetails";
import CustomerReview from "./Components/Pages/Customerreview";
import HotelOwnerList from "./Components/Pages/HotelOwnerList";
import HotelOwnerDetail from "./Components/Pages/HotelOwnerDetail";
import HotelList from "./Components/Pages/HotelList";
import ApprovedHotels from "./Components/Pages/ApprovedHotels";
import DeniedHotels from "./Components/Pages/DeniedHotels";
import PendingBooking from "./Components/Pages/PendingBooking";
import CompletedBooking from "./Components/Pages/CompletedBooking";
import CancelledBooking from "./Components/Pages/CancelledBooking";
import UpcomingBooking from "./Components/Pages/UpcomingBooking";
import CouponUpdate from "./Components/Pages/CouponUpdate";
import AssignCoupon from "./Components/Pages/AssignCoupon";
import HotelDetail from "./Components/Pages/HotelDetail";
import BestCity from "./Components/Pages/BestCity";
import UpdateBestCity from "./Components/Pages/UpdateBestCity";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <Header />}
      {location.pathname !== "/" && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Protect ComponentName={Home} />}></Route>

        <Route
          path="/profile"
          element={<Protect ComponentName={Profile} />}
        ></Route>

        <Route
          path="/customerlist"
          element={<Protect ComponentName={CustomerList} />}
        ></Route>

        <Route
          path="/coupon"
          element={<Protect ComponentName={Coupon} />}
        ></Route>

        <Route
          path="/couponUpdate/:id"
          element={<Protect ComponentName={CouponUpdate} />}
        ></Route>

        <Route
          path="/assignCoupon/:id"
          element={<Protect ComponentName={AssignCoupon} />}
        ></Route>

        <Route
          path="/Customerdetails/:id"
          element={<Protect ComponentName={CustomerDetails} />}
        ></Route>

        <Route
          path="/customerreview"
          element={<Protect ComponentName={CustomerReview} />}
        ></Route>
        <Route
          path="/hotelOwnerList"
          element={<Protect ComponentName={HotelOwnerList} />}
        ></Route>
        <Route
          path="/hotelOwnerDetail/:id"
          element={<Protect ComponentName={HotelOwnerDetail} />}
        ></Route>

        <Route
          path="/aboutUs"
          element={<Protect ComponentName={AboutUs} />}
        ></Route>

        <Route
          path="/termcondition"
          element={<Protect ComponentName={TermCondition} />}
        ></Route>

        <Route
          path="/privacypolicy"
          element={<Protect ComponentName={PrivacyPolicy} />}
        ></Route>

        <Route
          path="/contactus"
          element={<Protect ComponentName={ContactUs} />}
        ></Route>

        {/* // Hotel Route */}
        <Route
          path="/hotelList"
          element={<Protect ComponentName={HotelList} />}
        ></Route>

        <Route
          path="/deniedHotels"
          element={<Protect ComponentName={DeniedHotels} />}
        ></Route>

        <Route
          path="/approvedHotels"
          element={<Protect ComponentName={ApprovedHotels} />}
        ></Route>

        <Route
          path="/pendingBooking"
          element={<Protect ComponentName={PendingBooking} />}
        ></Route>

        <Route
          path="/cancelledBooking"
          element={<Protect ComponentName={CancelledBooking} />}
        ></Route>

        <Route
          path="/completedBooking"
          element={<Protect ComponentName={CompletedBooking} />}
        ></Route>

        <Route
          path="/upcomingBooking"
          element={<Protect ComponentName={UpcomingBooking} />}
        ></Route>

        <Route
          path="/hotelDetail/:id"
          element={<Protect ComponentName={HotelDetail} />}
        ></Route>

        <Route
          path="/bestCity"
          element={<Protect ComponentName={BestCity} />}
        ></Route>

        <Route
          path="/updateBestCity/:id"
          element={<Protect ComponentName={UpdateBestCity} />}
        ></Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
      {location.pathname !== "/"}
    </div>
  );
}

export default App;
