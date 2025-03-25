import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import SignupPage from "./pages/singup_page/singup_page";
import RolePage from "./pages/singup_page/role_page";
import ThxPage from "./pages/singup_page/finishsignup_page";
import LoginPage from "./pages/login_page/login_page";
import HomePage from "./pages/home_page/home_page";
import ListPage from "./pages/home_page/page_List";
import Detail from "./pages/detail_page/Detail";
import ProfilePage from "./pages/profile_page/profile_page";
import CreateBusiness from "./pages/business_page/create_business";
import MainBusiness from "./pages/business_page/main_business";
import Booking from "./pages/booking_page/booking";
import AddDetails from "./pages/business_page/add_detail";
// import Usermanage from "./pages/usermanage_page/usermanage_page";
import VerifyBusiness from "./pages/businessmanage_page/businessmanage_page";
import Test from "./pages/usermanage_page/test";
import PackagePage from "./pages/package/package_page";
import DetailPackage from "./pages/detail_page/detailPackage";
import { NavigateBar } from "./layouts/navigatebar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPath } from "./features/pathSlice";
import { fetchUser } from "./features/authSlice";
import { TopBarResponsive } from "./components/TopBarResponsive";
import Payment from "./pages/payment_page/payment";
import PaymentSelector from "./pages/payment_page/paymentSelected";
import QuotationPage from "./pages/quotation_page/quotationpage"
import BookingHistory from "./pages/booking_page/bookingHistory";


function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // ดึง path ปัจจุบันจาก react-router
  const currentPath = useSelector((state) => state.path.currentPath);
  const { user } = useSelector((state) => state.auth);
  const [isNaviOpen , setIsNaviOpen] = useState(false);

  const openNavi = () => {
    setIsNaviOpen(!isNaviOpen);
  }

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(setPath(location.pathname));
  }, [location, dispatch]);


  

  // console.log(currentPath);
  // console.log(user);


  return (
    <>
      {currentPath === "/login" || currentPath === "/signup" || currentPath === "/signup/role" || currentPath === "/signup/finishsignup" ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/role" element={<RolePage />} />
          <Route path="/signup/finishsignup" element={<ThxPage />} />
        </Routes>
      ) : (
        <>
        <TopBarResponsive setIsNaviOpen={openNavi} isNaviOpen={isNaviOpen}/>
        <div className="flex flex-1 lg:flex-row">
          <NavigateBar isNaviOpen={isNaviOpen}/>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/listpage/:title" element={<ListPage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/package" element={<PackagePage />} />
            <Route path="/detailpackage/:id" element={<DetailPackage />} />
            
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/mainBusiness" element={<MainBusiness />} />
            <Route
              path="/profile/mainBusiness/createBusiness"
              element={<CreateBusiness />}
            />
            <Route
              path="/profile/mainBusiness/createBusiness/adddetails/:id"
              element={<AddDetails />}
            />

            {/* <Route path="/detail/booking/:id/:index" element={<Booking />} />
            <Route path="/detail/:title/booking" element={<Booking />} /> */}
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route path="/paymentSelector" element={<PaymentSelector />} />
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/verifyBusiness" element={<VerifyBusiness />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>
        </>
      )}
    </>
  );
}

export default App;
