import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import DealsScroller from "./Deals-Scroller";
import Menucard from "./Menu-card";
import TopPicks from "./Top-picks";
import { Coordinates } from "./context-api";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../utilities/cart-slice";
import toast from "react-hot-toast";
import { setIsDiffRes } from "../utilities/dif-res";
import Shimmer from "./Shimmer";

function RestaurentMenu() {
  const { coordinates: { lat, lng } } = useContext(Coordinates);
  const { id } = useParams();
  const [resData, setResData] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicks, setTopPicks] = useState({});
  const isDiffRes = useSelector((state) => state.diffResSlice.isDiffRes);
  const dispatch = useDispatch();

  const fetchMenu = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      );
      const result = await response.json();
      if (result?.data?.cards) {
        setResData(result?.data?.cards[2]?.card?.card?.info || {});
        setMenuData(
          result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
            (data) => data?.card.card.itemCards || data?.card.card.categories
          ) || []
        );
        setDiscountData(
          result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
            ?.offers || []
        );
        setTopPicks(
          result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
            (data) => data?.card.card.title === "Top Picks"
          ) || {}
        );
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (error) {
      toast.error("Failed to fetch menu data");
    }
  }, [lat, lng, id]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const clearCart = useCallback(() => {
    dispatch(removeAll());
    toast.success("All Cleared");
  }, [dispatch]);

  const handleResetCart = useCallback(() => {
    clearCart();
    dispatch(setIsDiffRes(false));
  }, [clearCart, dispatch]);

  const handleCloseDialog = useCallback(() => {
    dispatch(setIsDiffRes(false));
  }, [dispatch]);

  return (
    menuData.length ? (
      <div className="w-full">
        <div className="w-[55%] mt-4 p-5 mx-auto text-3xl">
          <div className="text-xs flex gap-2 text-slate-500 cursor-default">
            <Link to="/">
              <span className="cursor-pointer duration-100 hover:font-semibold">Home</span>
            </Link>
            /
            <span className="cursor-pointer duration-100 hover:font-semibold">{resData.city}</span>
            /
            <span className="cursor-text font-semibold">{resData.name}</span>
          </div>
          <div className="mt-9 p-5">
            <h1 className="font-bold">{resData.name}</h1>
            <div className="relative m-5 rounded-3xl h-56 border-2 bg-white">
              <div className="p-4 pr-5">
                <p className="flex items-center gap-1 text-xl font-bold">
                  <i className="fi fi-ss-circle-star text-lime-700" />
                  {resData.avgRatingString}
                  <span>({resData.totalRatingsString})</span> .
                  <span>{resData.costForTwoMessage}</span>
                </p>
                <p className="text-xl font-bold underline text-custom-light-ogange">
                  {resData.cuisines?.join(", ")}
                </p>
                <div className="mt-2 ml-2 flex gap-3 text-xl font-bold">
                  <div className="flex flex-col mt-3 items-center w-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-[1px] h-7 bg-gray-400"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-base">
                      Outlet
                      <span className="ml-5 font-medium text-gray-500">{resData.locality}</span>
                    </p>
                    <p className="mt-2">{resData.sla?.slaString}</p>
                  </div>
                </div>
                <hr className="mb-3 mt-5" />
                {resData.feeDetails?.message && (
                  <p className="flex gap-4 font-medium text-base text-gray-500">
                    <img
                      className="w-7"
                      src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu"
                      alt="Delivery fee"
                    />
                    <span>
                      {resData.feeDetails.message.replace(/<\/?[^>]+(>|$)/g, "")}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <DealsScroller Data={discountData} />
          {topPicks?.card?.card?.carousel && (
            <TopPicks Data={topPicks} resData={resData} />
          )}
          <div className="bg-custom-light-gray">
            {isDiffRes && (
              <div className="w-[620px] h-[254px] bottom-10 ml-[10%] flex-col justify-center items-center bg-white border z-50 shadow-2xl opacity-100 p-5 fixed">
                <h1 className="mt-2 font-bold">Items already in cart</h1>
                <p className="my-7 text-gray-500 text-xl">
                  Your cart contains items from another restaurant. Would you like to reset your cart for adding items from this restaurant?
                </p>
                <div className="flex justify-between">
                  <button
                    className="w-64 h-14 text-xl bg-white border-2 text-lime-600 border-lime-600"
                    onClick={handleCloseDialog}
                  >
                    NO
                  </button>
                  <button
                    className="ml-14 w-64 h-14 text-xl text-white bg-lime-600 border border-lime-500"
                    onClick={handleResetCart}
                  >
                    YES, START AFRESH
                  </button>
                </div>
              </div>
            )}
            {menuData.map(({ card: { card } }) => (
              <Menucard key={card.id || card.title} card={card} resData={resData} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <Shimmer />
    )
  );
}

export default RestaurentMenu;
