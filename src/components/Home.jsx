import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Scroller from "./Scroller";
import TopRestaurents from "./TopRestaurents";
import Body from "./Body";
import Filter from "./Filter";
import { Address, CartContext, Coordinates, Locality } from "./context-api";
import Shimmer from "./Shimmer";
import useHomeData from "../hooks/useHomeData";

function Home() {

  const [showMore,scroleData,topRestaurantData,data,topResTitle,placesToEatAcrossCities,onlineTitle,popularCities,cuisinesNearMe,setAddress,locality,setCoordinates,setLocality] = useHomeData()

  async function fetchLatAndLng(id) {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
      );
      const result = await response.json();
      const location = result?.data[0]?.geometry?.location;
      setCoordinates({ lat: location.lat, lng: location.lng });
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("userLocation", JSON.stringify(location));
      setAddress(result.data[0].formatted_address);

      const checkLocality = result?.data[0]?.address_components.find(
        (data) => data?.types[0] === "locality"
      )?.short_name;
      setLocality(checkLocality || "Other");
    } catch (error) {
      // console.error("Error fetching coordinates: ", error);
    }
  }


  const filterVal = useSelector((state) => state.filterSplice.filterVal);
  const filterData = data?.filter((item) => {
    if (!filterVal) return true;
    switch (filterVal) {
      case "Fast Delivery":
        return; // Add appropriate filter condition
      case "Rating 4.0+":
        return item?.info?.avgRating > 4;
      case "Pure Veg":
        return; // Add appropriate filter condition
      case "Offers":
        return; // Add appropriate filter condition
      case "Less Than Rs 300":
        return item?.info?.costForTwo?.slice(1, 4) < "300";
      default:
        return true;
    }
  });

  return data?.length ? (
    <div>
      {scroleData && <Scroller Data={scroleData} />}
      {topRestaurantData && (
        <TopRestaurents Data={topRestaurantData} title={topResTitle} />
      )}
      {data && (
        <Body Data={filterVal ? filterData : data} title={onlineTitle} />
      )}
      {!data && !scroleData && !topRestaurantData && (
        <div className="w-[100%] h-[100%] flex items-center justify-center ">
          <div className="my-20 w-[380px] min-h-[438px] flex-col text-center justify-center items-center">
            <img
              className="my-16 mx-auto w-[300px] h-[300px]"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
              alt="Location Unserviceable"
            />
            <div className="text-2xl font-bold">Location Unserviceable</div>
            <div className="text-xl">
              We don’t have any services here till now. Try changing location.
            </div>
          </div>
        </div>
      )}

      {placesToEatAcrossCities && (
        <div className="-4 p-7 m-32">
          <h1 className="text-3xl font-extrabold">
            {placesToEatAcrossCities.title}
          </h1>
          <div className="grid grid-cols-4 mt-5 gap-4">
            {placesToEatAcrossCities?.brands?.map(({ text }, i) => {
              if (i >= 11 && showMore !== 1) return null;
              return (
                <div
                  key={i}
                  onClick={async () => {
                    const response = await fetch(
                      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${
                        text?.split(" ")[3]
                      }`
                    );
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    const result = await response.json();
                    fetchLatAndLng(result.data[0].place_id);
                  }}
                  className="border-2 text-xl cursor-pointer m-1 text-pretty line-clamp-1 font-semibold flex items-center justify-center rounded-xl w-[320px] h-[56px]"
                >
                  {text}
                </div>
              );
            })}
            {showMore !== 1 && (
              <div
                onClick={() => setShowMore(1)}
                className="border-2 text-xl cursor-pointer m-1 line-clamp-1 font-semibold flex items-center justify-center rounded-xl w-[320px] h-[56px]"
              >
                Show More
              </div>
            )}
          </div>
        </div>
      )}

      {popularCities && (
        <div className="-4 p-7 m-32">
          <h1 className="text-3xl font-extrabold">{popularCities.title}</h1>
          <div className="grid grid-cols-4 mt-5 gap-4">
            {popularCities?.cities?.map(({ text }, i) => {
              if (i >= 11 && showMore !== 3) return null;
              return (
                <div
                  key={i}
                  onClick={async () => {
                    const response = await fetch(
                      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${text}`
                    );
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    const result = await response.json();
                    fetchLatAndLng(result.data[0].place_id);
                  }}
                  className="border-2 text-xl cursor-pointer m-1 line-clamp-1 font-semibold flex items-center justify-center rounded-xl w-[320px] h-[56px]"
                >
                  {text}
                </div>
              );
            })}
            {showMore !== 3 && (
              <div
                onClick={() => setShowMore(3)}
                className="border-2 text-xl cursor-pointer m-1 line-clamp-1 font-semibold flex items-center justify-center rounded-xl w-[320px] h-[56px]"
              >
                Show More
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <Shimmer />{" "}
      <div className="w-full bg-gray-100 py-8">
        <div className="shimmer-wrapper mx-auto w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="shimmer-wrapper">
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
                <div className="shimmer-card"></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
