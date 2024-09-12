// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { Address, Coordinates, Locality } from "../components/context-api";

function useHomeData() {
    const {
        coordinates: { lat, lng },
        setCoordinates,
      } = useContext(Coordinates);

      const [showMore, setShowMore] = useState(0);
      const [scroleData, setScroleData] = useState([]);
      const [topRestaurantData, setTopRestaurantData] = useState([]);
      const [data, setData] = useState([]);
      const [topResTitle, setTopResTitle] = useState("");
      const [onlineTitle, setOnlineTitle] = useState("");
      const [popularCities, setPopularCities] = useState([]);
      const [placesToEatAcrossCities, setPlacesToEatAcrossCities] = useState([]);
      const [cuisinesNearMe, setCuisinesNearMe] = useState([]);
      const { setAddress } = useContext(Address);
      const { locality, setLocality } = useContext(Locality);

      async function fetchData() {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
          );
          const result = await response.json();

          setScroleData(
            result.data?.cards?.find(
              (data) => data?.card?.card?.id === "whats_on_your_mind"
            )?.card?.card?.imageGridCards?.info
          );
          setTopRestaurantData(
            result.data?.cards?.find(
              (data) => data?.card?.card?.id === "top_brands_for_you"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants
          );
          setData(
            result.data?.cards?.find(
              (data) => data?.card?.card?.id === "restaurant_grid_listing"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants
          );
          setPopularCities(
            result.data?.cards?.find(
              (data) => data?.card?.card?.id === "popular_cities"
            )?.card?.card
          );
          setPlacesToEatAcrossCities(
            result.data?.cards?.find(
              (data) =>
                data?.card?.card?.title === "Best Places to Eat Across Cities"
            )?.card?.card
          );
          setCuisinesNearMe(
            result.data?.cards?.find(
              (data) => data?.card?.card?.title === "Best Cuisines Near Me"
            )?.card?.card
          );
          setTopResTitle(
            result.data?.cards?.find(
              (data) => data?.card?.card?.id === "top_brands_for_you"
            )?.card?.card?.header?.title
          );
          setOnlineTitle(
            result.data?.cards?.find(
              (data) => data?.card?.card?.id === "popular_restaurants_title"
            )?.card?.card?.title
          );
          setShowMore(0);
        } catch (error) {
          // console.error("Error fetching data: ", error);
        }
      }

      useEffect(() => {
        fetchData();
      }, [lat, lng]);

  return([showMore,scroleData,topRestaurantData,data,topResTitle,placesToEatAcrossCities,onlineTitle,popularCities,cuisinesNearMe,setAddress,locality,setAddress,setCoordinates,setLocality])
}

export default useHomeData
