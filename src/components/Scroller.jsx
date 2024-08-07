import React, { useEffect, useRef, useState } from "react";
import Data from '../assets/Data'

function Scroller({Data}) {


  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450; // Adjust this value as needed
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-[75%] h-16 p-3 mx-auto flex text-3xl justify-between">
        <h1 className="font-bold p-2">What's on your mind?</h1>
        <div className="flex gap-2 mt-2 mr-4">
          <div
            onClick={() => scroll("left")}
            className=" bg-gray-200 rounded-full "
          >
            <i className=" fi fi-rr-arrow-small-left" />
          </div>
          <div
            onClick={() => scroll("right")}
            className=" bg-gray-300 rounded-full"
          >
            <i className="fi fi-rr-arrow-small-right" />
          </div>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="w-[72%] mx-auto gap-7 duration-1000  flex mt-3 overflow-scroll hide-scrollbar"
      >
        {Data?.map((item) => {
          return (
            <img
            key={item.imageId}
              className="w-44 cursor-pointer mix-blend-multiply"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.imageId}`}
              alt=""
            />
          );
        })}
      </div>
      <hr className="w-[72%] mt-16 mx-auto border" />
    </div>
  );
}

export default Scroller;
