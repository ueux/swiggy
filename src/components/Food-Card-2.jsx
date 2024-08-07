import React from "react";
import { Link } from "react-router-dom";
import AddBtn from "./Add-btn";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../utilities/search-slice";
import { setURLkeys, toggleMoreDishes } from "../utilities/toogle-slice";
import { setFirtItem } from "../utilities/dif-res";

function FoodCard2({ info, restaurant }) {
  if (!info || !restaurant) {
    console.error("Missing info or restaurant data");
    return null;
  }

  const {
    name,
    imageId,
    price,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 } = {},
    } = {},
    description,
    defaultPrice,
    isVeg,
  } = info;

  const cartData = useSelector((state) => state.cartSlice.info);
  const dispatch = useDispatch();

  const {
    info: { avgRating, name: restaurantName } = {},
  } = restaurant;

  function moreDishes(item) {
    const {
      card: {
        card: {
          restaurant: {
            info: {
              slugs: { city, restaurant },
            },
          },
          info: { id: itemId, name: itemName },
          restaurant: { info: { id: resId } },
        },
      },
    } = item;

    if (cartData.length === 0) {
      dispatch(setResults([item]));
      dispatch(toggleMoreDishes());
      dispatch(setURLkeys({ itemName, itemId, resId, city, restaurant }));
    }
    dispatch(setFirtItem({ ...item.card.card.info, resData: item.card.card.restaurant }));
    dispatch(setURLkeys({ itemName, itemId, resId, city, restaurant }));
  }

  return (
    <div className="bg-white rounded-xl w-[48%] border h-fit mt-5 shadow-md">
      <Link to={`rest-menu/${restaurant.info.id}`}>
        <div className="p-6">
          <div className="flex-col justify-between items-center">
            <h1 className="text-2xl font-bold">{restaurantName}</h1>
            <p className="flex items-center">
              <i className="fi fi-ss-circle-star text-xl text-lime-700" />
              <span className="ml-1 text-xl">{avgRating}</span>
            </p>
          </div>
        </div>
      </Link>
      <div className="flex p-6 border-t">
        <div className="flex-1">
          <img
            className="w-6"
            src={isVeg === 1
              ? "https://clipground.com/images/veg-logo-png-6.png"
              : "https://www.pinclipart.com/picdir/big/419-4194820_veg-icon-png-non-veg-logo-png-clipart.png"}
            alt={isVeg === 1 ? "Vegetarian" : "Non-Vegetarian"}
          />
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-xl font-semibold text-gray-600">
            ₹ {(defaultPrice || price) / 100}
          </p>
          {rating && (
            <p className="text-sm flex items-center gap-1 my-2 font-bold text-lime-600">
              <i className="fi fi-ss-star mt-1" />
              <span>{rating}</span>
              <span className="text-gray-500">({ratingCountV2})</span>
            </p>
          )}
          <p className="text-sm mt-2 line-clamp-2 w-80 text-gray-500">
            {description}
          </p>
        </div>
        <div className="relative">
          {imageId ? (
            <>
              <img
                className="rounded-2xl ml-4 mt-6 mb-10 w-[200px] h-[180px] object-cover"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                alt={name}
              />
              <div onClick={() => moreDishes({ card: { card: { info, restaurant } } })} className="absolute left-3">
                <AddBtn
                  info={{ ...info, resData: { ...restaurant.info } }}
                  css="absolute cursor-pointer flex justify-center shadow-sm items-center text-lime-700 h-12 w-36 bottom-5 left-24 transform -translate-x-1/2 pb-1 rounded-xl border bg-white"
                />
              </div>
              {info.variants?.variantGroups && (
                <div className="text-base absolute bottom-0 left-1/2 transform -translate-x-1/2 m-0 p-0 font-light">
                  Customisable
                </div>
              )}
            </>
          ) : (
            <div onClick={() => moreDishes({ card: { card: { info, restaurant } } })} className="relative">
              <AddBtn
                info={{ ...info, resData: { ...restaurant.info } }}
                css="absolute cursor-pointer flex justify-center shadow-sm items-center text-lime-700 h-12 w-36 -bottom-24 -left-44 pb-1 rounded-xl border bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard2;
