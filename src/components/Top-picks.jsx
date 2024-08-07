import React, { useRef } from "react";
import AddBtn from "./Add-btn";

function TopPicks({ Data: { card: { card: { carousel } } }, resData }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto flex items-center justify-between py-3">
        <h1 className="text-2xl font-bold">Top Picks</h1>
        <div className="flex gap-1 h-12 w-24">
          <div
            onClick={() => scroll("left")}
            className="cursor-pointer w-[50%] flex justify-center items-center bg-custom-light-gray rounded-full"
          >
            <i className="fi fi-rr-arrow-small-left" />
          </div>
          <div
            onClick={() => scroll("right")}
            className="cursor-pointer w-[50%] flex justify-center items-center bg-custom-dark-gray rounded-full"
          >
            <i className="fi fi-rr-arrow-small-right" />
          </div>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="w-[93%] flex gap-4 ml-6 mt-3 overflow-x-scroll hide-scrollbar"
      >
        {carousel?.map(({ creativeId, dish: { info } }) => (
          <div
            key={creativeId}
            className="relative min-w-[384px] rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <img
              className="w-full"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
              alt={info.name}
            />
            <div className="absolute text-xl bottom-12 left-5 text-white">
              ₹{(info.price || info.defaultPrice) / 100}
            </div>
            <AddBtn
              info={{ ...info, resData }}
              css="absolute flex justify-center shadow-sm items-center text-lime-700 h-12 w-36 bottom-10 right-10 rounded-xl border bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPicks;
