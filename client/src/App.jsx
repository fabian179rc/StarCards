import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Route, Routes } from "react-router-dom";
import Login from './components/Registro/Login'
import UserProfile from "./components/UserProfile/UserProfile";
import LandingPage from "./components/LandingPage/LandingPage";
import Playroom from "./components/Playroom/Playroom";
import Shop from "./components/Shop/Shop";
import PurchaseCompleted from "./components/Shop/PurchaseCompleted";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";
import { resetReduxState } from "./redux/actions";
import RecoveryPassword from './components/Registro/RecoveryPassword';
import Registro from './components/Registro/Registro';
import "./App.css";

// import ProtectedRoutes from './ProtectedRoutes'
// import Registro from './components/Registro/Registro'
// import Inventory from "./components/UserProfile/Inventory/Inventory";
// import { setToken } from './redux/actions/user'
// import ShopCart from "./components/Shop/ShopCart/ShopCart";

function App() {

  const dispatch = useDispatch();

  function handleKeyboard(e) {
    if (e.repeat) return;
    if ((e.metaKey || e.ctrlKey) && e.key === "x") {
      dispatch(resetReduxState());
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<Registro />} />
        <Route path="/recovery" element={<RecoveryPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/purchase-completed" element={<PurchaseCompleted />} />
        <Route path='/playroom' element={<Playroom />} />
        <Route path="/userProfile" element={<UserProfile />} />
        {/* <Route path='/shopcart' element={<ShopCart />} /> */}
        {/* <Route path="/inventory" element={<Inventory />} /> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
