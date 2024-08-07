import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Address, Coordinates, Locality, PlaceName } from "./context-api";
import { toogleSearchBar, toogleSignIn } from "../utilities/toogle-slice";
import SignIn from "./Signin";
import Signout from "./Signout";

function Navbar() {
  const visibility = useSelector((state) => state.ToogleSlice.searchToogle);
  const cartData = useSelector((state) => state.cartSlice.info);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authSlice.userData);

  const [showMessageBox, setShowMessageBox] = useState(false);

  const signinVisibility = useSelector(
    (state) => state.ToogleSlice.signinToggle
  );

  const { coordinates, setCoordinates } = useContext(Coordinates);
  const { address, setAddress } = useContext(Address);
  const { setPlaceName } = useContext(PlaceName);
  const { locality, setLocality } = useContext(Locality);

  const [searchResults, setSearchResults] = useState([]);
  const [recentVisited, setRecentVisited] = useState([]);

  const fetchLatAndLng = useCallback(
    async (id) => {
      try {
        handleVisibility();
        const response = await fetch(
          `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
        );
        const result = await response.json();
        const location = result?.data[0].geometry?.location;
        setCoordinates({
          lat: location.lat,
          lng: location.lng,
        });
        localStorage.setItem("id", JSON.stringify(id));
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            lat: location.lat,
            lng: location.lng,
          })
        );
        setAddress(result.data[0].formatted_address);
        setPlaceName(
          result.data[0].address_components.find(
            (data) => data?.types[0] === "city"
          )?.short_name
        );
        const checkLocality = result?.data[0]?.address_components.find(
          (data) => data?.types[0] === "locality"
        )?.short_name;
        setLocality(checkLocality || "Other");
      } catch (error) {
        // console.error("Error fetching location data:", error);
      }
    },
    [setCoordinates, setAddress, setPlaceName, setLocality]
  );

  useEffect(() => {
    fetchLatAndLng(
      JSON.parse(localStorage.getItem("id")) || "ChIJjZkCTTMHoDkRf-ge80zUuQU"
    );
  }, [fetchLatAndLng]);

  const searchResult = useCallback(async (val) => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`
      );
      const result = await response.json();
      setSearchResults(result.data);
    } catch (error) {
      // console.error("Error fetching search results:", error);
    }
  }, []);

  const handleVisibility = () => {
    dispatch(toogleSearchBar());
  };

  const handleSignInVisibility = () => {
    dispatch(toogleSignIn());
  };

  const restoreRecentVisitedFromLS = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("recentVisited")) || [];
    setRecentVisited(data);
  }, []);

  useEffect(() => {
    restoreRecentVisitedFromLS();
  }, [restoreRecentVisitedFromLS]);

  const clearRecentVisited = () => {
    setRecentVisited([]);
    localStorage.removeItem("recentVisited");
  };

  const storeRecentVisitedInLS = (data) => {
    const updatedRecentVisited = [...recentVisited, data];
    setRecentVisited(updatedRecentVisited);
    localStorage.setItem("recentVisited", JSON.stringify(updatedRecentVisited));
  };

  const handleCurrentLocation = () => {
    handleVisibility();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          localStorage.setItem(
            "userLocation",
            JSON.stringify({
              lat: latitude,
              lng: longitude,
            })
          );
          const response = await fetch(
            `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${latitude},${longitude}`
          );
          const data = await response.json();
          // console.log(data)
          const placeId = data?.data.filter((data)=>data.place_id)[0].place_id;
          localStorage.setItem("id", JSON.stringify(placeId));
          const address = data?.data[0].formatted_address;
          setAddress(address);
          setPlaceName(
            data.data[0].address_components.find((component) =>
              component.types.includes("locality")
            )?.short_name || "Unknown"
          );
          setLocality(
            data.data[0].address_components.find((component) =>
              component.types.includes("locality")
            )?.short_name || "Other"
          );
        },
        (error) => {
          // console.error("Error getting location:", error);
        }
      );
    } else {
      // console.error("Geolocation is not supported by this browser.");
    }
  };

  const navItems = [
    {
      link: "/corporate",
      name: "Swiggy Corporate",
      icon: "fi-rr-shopping-bag",
    },
    { link: "/search", name: "Search", icon: "fi-rr-search" },
    { link: "/offers", name: "Offers", icon: "fi-rr-badge-percent" },
    { link: "/help", name: "Help", icon: "fi-sr-life-ring" },
    { link: "/signin", name: "Signin", icon: "fi-rr-user" },
    {
      link: "/rest-menu/cart",
      name: `Cart${cartData?.length ? `(${cartData.length})` : ""}`,
      icon: "fi-rr-shopping-cart-add",
    },
  ];

  return (
    <>
      {visibility && (
        <>
          <div
            onClick={handleVisibility}
            className="bg-custom-light-black opacity-70 z-10 w-full h-full absolute"
          ></div>
          <div
            className={
              " overflow-y-scroll absolute z-20 w-[675px] bg-white h-full duration-500 " +
              (visibility ? "left-0" : "left-[100%]")
            }
          >
            <div className="ml-44">
              <div className="mb-4">
                <div className="mt-9 cursor-pointer">
                  <i
                    onClick={handleVisibility}
                    className="text-gray-400 fi fi-br-cross"
                  />
                </div>
                <input
                  className="text-xl mt-10 p-5 focus:outline-none focus:shadow-xl w-[440px] h-[65px] border-2"
                  placeholder="Search for area, street name.."
                  type="text"
                  onInput={(e) => searchResult(e.target.value)}
                />
                <div>cancel</div>
              </div>
              {searchResults?.length ? (
                searchResults.map((data, i) => {
                  const {
                    place_id,
                    structured_formatting: { main_text, secondary_text },
                  } = data;
                  return (
                    <React.Fragment key={place_id}>
                      <div
                        onClick={() => {
                          fetchLatAndLng(place_id);
                          setRecentVisited((prev) => [...prev, data]);
                          storeRecentVisitedInLS(data);
                          setSearchResults([]);
                        }}
                        className="hover:text-orange-500 cursor-pointer text-lg flex items-center w-[440px] h-[105px] mt-2 p-7"
                      >
                        <i className="mr-3 text-gray-400 mb-7 fi fi-rr-marker" />
                        <div>
                          <div className="text-xl font-semibold">
                            {main_text}
                          </div>
                          <div className="text-base text-gray-400">
                            {secondary_text}
                          </div>
                        </div>
                      </div>
                      {i !== searchResults.length - 1 ? (
                        <hr className="w-[410px] ml-14 border-dashed border-black/40" />
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <div>
                  <div className="hover:text-orange-500 text-lg flex items-center w-[440px] h-[105px] mt-9 p-7 border-2">
                    <div
                      className="cursor-pointer"
                      onClick={handleCurrentLocation}
                    >
                      <div className="text-xl font-semibold">
                        Get current location
                      </div>
                      <div className="text-base text-gray-400">Using GPS</div>
                    </div>
                  </div>
                  {recentVisited.length > 0 && (
                    <div className="border-2 w-[440px] mt-5">
                      <div className="text-lg flex-col items-center w-full h-full p-7">
                        <div className="flex justify-between">
                          <div className="text-sm ml-5 text-gray-300 font-semibold">
                            RECENT SEARCHES
                          </div>
                          <span
                            onClick={clearRecentVisited}
                            className="hover:text-orange-500 cursor-pointer text-black/60"
                          >
                            clear
                          </span>
                        </div>
                        {recentVisited.map(
                          (
                            {
                              place_id,
                              structured_formatting: {
                                main_text,
                                secondary_text,
                              },
                            },
                            i
                          ) => (
                            <React.Fragment key={place_id}>
                              <div
                                onClick={() => fetchLatAndLng(place_id)}
                                className="hover:text-orange-500 cursor-pointer text-lg flex items-center w-[410px] h-[105px] mt-2"
                              >
                                <i className="mr-3 text-gray-400 mb-7 fi fi-rr-marker" />
                                <div>
                                  <div className="text-xl font-semibold">
                                    {main_text}
                                  </div>
                                  <div className="text-base text-gray-400">
                                    {secondary_text}
                                  </div>
                                </div>
                              </div>
                              {i !== recentVisited.length - 1 ? (
                                <hr className="w-[378px] ml-8 border-dashed border-black/40" />
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {!userData ? (
        <>
          {signinVisibility && (
            <>
              <div
                onClick={handleSignInVisibility}
                className="bg-custom-light-black opacity-70 z-10 w-full h-full absolute"
              ></div>
              <div className="overflow-y-scrol absolute right-0 z-20 w-[675px] bg-white h-full duration-500">
                <div className="p-2 mt-5 ">
                  <i
                    onClick={handleSignInVisibility}
                    className="ml-10 text-gray-400 text-lg cursor-pointer fi fi-br-cross"
                  />
                  <SignIn />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}
      <div className="relative">
        <div
          className={
            "w-full top-0 z-50 bg-white shadow-md h-24 flex justify-center items-center " +
            (visibility || signinVisibility ? "" : "sticky top-0 z-50")
          }
        >
          <div className="w-[85%] flex justify-between">
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="h-14 ml-7 w-10 object-cover hover:scale-110 duration-100 mr-6"
                  src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                  alt=""
                />
              </Link>
              <div
                onClick={handleVisibility}
                className="flex cursor-pointer text-lg items-center hover:text-orange-500"
              >
                <span className="cursor-pointer block font-bold ml-7 mr-5 border-b-2 border-black">
                  {locality}
                </span>
                {address && (
                  <span className="max-w-56 font-light text-gray-600 line-clamp-1">
                    {address}
                  </span>
                )}
                <i className="fi custom-light-orange text-3xl text-orange-500 mt-1 fi-rs-angle-small-down"></i>
              </div>
            </div>
            <div className="flex items-center gap-14 mr-8">
              {navItems.map((item, i) =>
                item.name === "Signin" ? (
                  <div key={i}>
                    <div className="pt-4 h-full text-xl flex items-center hover:text-orange-500 text-gray-600 hover:cursor-pointer font-medium">
                      {userData ? (
                        <div>
                          <div
                            onMouseEnter={() => setShowMessageBox(true)}
                            onMouseLeave={() => setShowMessageBox(false)}
                            className="relative flex"
                          >
                           {!showMessageBox? <>{userData.photo ? (
                              <img
                                className="w-8 h-8 rounded-full "
                                src={userData.photo}
                                alt=""
                              />
                            ) : (
                              <i className={`fi ${item.icon}`} />
                            )}
                            <span className="ml-5">{userData.name}</span></>:
                            <div
                              className={`w-56 p-2  pl-7 rounded  transition-all duration-1000 ease-in-out ${
                                showMessageBox
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-2"
                              }`}
                            >
                              <Signout/>
                            </div>}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div onClick={handleSignInVisibility}>
                            <i className={`fi ${item.icon}`} />
                            <span className="ml-5">{item.name}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={item.link} key={i}>
                    <div className="pt-4 h-full text-xl hover:text-orange-500 text-gray-600 hover:cursor-pointer font-medium">
                      <i className={`fi ${item.icon}`} />
                      <span className="ml-5">{item.name}</span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
