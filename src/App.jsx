import { Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import RestaurentMenu from "./components/RestaurentMenu";
import {
  Address,
  CartContext,
  Coordinates,
  Locality,
  PlaceName,
  scrolPause,
} from "./components/context-api";
import React, { lazy, Suspense, useEffect, useState } from "react";
// import Cart from "./components/Cart";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./utilities/store";
import SignInPage from "./components/Signin";
import SignIn from "./components/Signin";
import Shimmer from "./components/Shimmer";
// import Search from "./components/Search";

const Search=lazy(()=>import("./components/Search"))
const Cart=lazy(()=>import("./components/Cart"))
const RestaurentMenu=lazy(()=>import("./components/RestaurentMenu"))
const Home=lazy(()=>import("./components/Home"))

function App() {
  // const [visiblity, setVisiblity] = useState(false);
  const visiblity = useSelector((state) => state.ToogleSlice.searchToogle);
  const isDiffRes = useSelector((state) => state.diffResSlice.isDiffRes);

  const signinVisibility = useSelector(
    (state) => state.ToogleSlice.signinToggle
  );

  const [coordinates, setCoordinates] = useState(
    JSON.parse(localStorage.getItem("userLocation")) || []
  );
  const [locality, setLocality] = useState("Other");
  // const [cartData, setCartData] = useState([]);

  // function getDataFromLS() {
  //   let data = JSON.parse(localStorage.getItem("cartData")) || [];
  //   setCartData(data)
  // }
  // useEffect(() => {
  //   getDataFromLS()
  // },[])

  const [placeName, setPlaceName] = useState();
  const [address, setAddress] = useState();
  return (
    <Locality.Provider value={{ locality, setLocality }}>
      {/* <CartContext.Provider value={{ cartData, setCartData }}> */}
      <PlaceName.Provider value={{ placeName, setPlaceName }}>
        <Address.Provider value={{ address, setAddress }}>
          <Coordinates.Provider value={{ coordinates, setCoordinates }}>
            {/* <scrolPause.Provider value={{ visiblity, setVisiblity }}> */}
            <div
              className={` ${
                visiblity || signinVisibility || isDiffRes
                  ? "overflow-hidden max-h-screen"
                  : ""
              }`}
            >
              <Suspense><Routes>
                <Route path="/" element={<Navbar />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/rest-menu/:id" element={<RestaurentMenu />} />

                  <Route
                    path="/search/rest-menu/:id"
                    element={<RestaurentMenu />}
                  />
                  <Route path="/rest-menu/cart" element={<Cart />} />
                  <Route path="/search" element={<Suspense fallback={<h1>Shimmer</h1>}><Search /></Suspense>} />
                  <Route path="*" element={<h1>COMMING SOON</h1>} />
                </Route>
              </Routes></Suspense>

            </div>
            {/* </scrolPause.Provider> */}
          </Coordinates.Provider>
        </Address.Provider>
      </PlaceName.Provider>
      {/* </CartContext.Provider> */}
    </Locality.Provider>
  );
}

export default App;
