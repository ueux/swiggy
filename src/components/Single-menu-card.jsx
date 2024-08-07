import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AddBtn from "./Add-btn";
import { setIsDiffRes } from "../utilities/dif-res";
import { addToCart, removeAll } from "../utilities/cart-slice";

function SingleMenuCard({ itemCards, resData, title }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.info);

  const [currentIndex, setCurrentIndex] = useState(true);

  const toggleMenu = () => {
    setCurrentIndex(!currentIndex);
  };

  return (
    <div className="bg-white mb-1">
      <div className="relative p-7">
        <h1 className="font-bold">
          {title} ({itemCards?.length})
        </h1>
        <i
          onClick={toggleMenu}
          className={`absolute cursor-pointer top-7 right-0 fi text-3xl mt-1 fi-rs-angle-small-${
            currentIndex ? "up" : "down"
          }`}
        />
      </div>

      {currentIndex && (
        <div>
          {itemCards?.map(({ card: { info } }, index) => {
            if (!info?.itemAttribute?.vegClassifier) return null;
            const {
              name,
              price,
              defaultPrice,
              itemAttribute: { vegClassifier },
              ratings: {
                aggregatedRating: { rating, ratingCountV2 } = {},
              } = {},
              imageId,
              description,
            } = info;

            return (
              <div key={index} className="font-semibold flex text-2xl p-4">
                <div className="w-[700px] p-5">
                  <img
                    className="w-6"
                    src={
                      vegClassifier === "VEG"
                        ? "https://clipground.com/images/veg-logo-png-6.png"
                        : "https://www.pinclipart.com/picdir/big/419-4194820_veg-icon-png-non-veg-logo-png-clipart.png"
                    }
                    alt=""
                  />
                  <h2 className="font-bold text-gray-700">{name}</h2>
                  <p className="text-[18px] font-bold">
                    ₹ {(defaultPrice || price) / 100}
                  </p>
                  {rating && (
                    <p className="text-sm flex items-center gap-1 my-2 font-bold text-lime-600">
                      <i className="fi fi-ss-star mt-1" />
                      <span>{rating}</span>
                      <span className="text-gray-500">({ratingCountV2})</span>
                    </p>
                  )}
                  <p className="text-xl mt-2 line-clamp-2 text-gray-500">
                    {description}
                  </p>
                </div>
                <div className="relative justify-center items-center">
                  {imageId ? (
                    <>
                      <img
                        className="rounded-2xl ml-16 mt-6 mb-10 w-[200px] h-[180px] object-cover"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                        alt=""
                      />
                      <AddBtn
                        info={{ ...info, resData }}
                        css="absolute cursor-pointer flex text justify-center shadow-sm items-center text-lime-700 h-12 w-36 bottom-5 left-20 ml-3 pb-1 rounded-xl border bg-white"
                      />
                      {info.variants?.variantGroups && (
                        <div className="text-base absolute bottom-0 left-20 m-0 p-0 font-light">
                          Customisable
                        </div>
                      )}
                    </>
                  ) : (
                    <AddBtn
                      info={{ ...info, resData }}
                      css="absolute cursor-pointer flex text justify-center shadow-sm items-center text-lime-700 h-12 w-36 bottom-5 left-20 ml-3 pb-1 rounded-xl border bg-white"
                    />
                  )}
                </div>
                {index !== itemCards.length - 1 && (
                  <hr className="ml-8 border-dashed border-black/40" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SingleMenuCard;
