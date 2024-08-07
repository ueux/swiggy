import React, { useContext, useRef } from "react";
import FoodCard from "./FoodCard";
import { Address, PlaceName } from "./context-api";

function TopRestaurants({ Data, title }) {
  const { placeName } = useContext(PlaceName);
  const { address } = useContext(Address);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 900; // Adjust this value as needed
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
      <div className="w-[75%] h-16 p-3 mt-10 mx-auto flex text-3xl justify-between">
        <h1 className="font-bold p-2">{title}</h1>
        <div className="flex gap-2 mt-2 mr-4">
          <div onClick={() => scroll("left")} className="bg-gray-200 rounded-full">
            <i className="fi fi-rr-arrow-small-left" />
          </div>
          <div onClick={() => scroll("right")} className="bg-gray-300 rounded-full">
            <i className="fi fi-rr-arrow-small-right" />
          </div>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="w-[72.5%] mt-5 ml-64 gap-8 duration-1000 flex overflow-scroll hide-scrollbar"
      >
        {Data?.map(({ info, cta: { link } }, index) => (
          <FoodCard key={index} {...info} link={link} />
        ))}
      </div>
      <hr className="w-[72%] mt-20 mx-auto border" />
    </div>
  );
}

export default TopRestaurants;
