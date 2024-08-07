import React, { useRef } from "react";

function DealsScroller({ Data }) {
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
        <h1 className="text-3xl font-bold">Deals for you</h1>
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
        className="w-[90%] flex ml-8 px-4 mt-3 overflow-x-scroll hide-scrollbar"
      >
        {Data?.map(({ info: {id, header, offerLogo, couponCode } }) => (
          <div
            key={header} // Assuming couponCode is unique
            className="border border-gray-300 rounded-[30px] flex items-center min-w-[400px] m-3"
          >
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
              alt={header}
              className="w-16 h-16 p-1 rounded-md mr-4"
            />
            <div className="text-2xl font-bold flex flex-col justify-center">
              <h1>{header}</h1>
              <p className="text-sm text-gray-600">{couponCode}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-lg mt-8 mb-4 text-center">MENU</h2>
      <div className="relative cursor-pointer m-7">
        <div className="text-lg text-center bg-custom-light-gray rounded-xl p-3">
          Search for dishes
        </div>
        <i className="absolute top-3 right-2 text-gray-400 fi fi-rr-search" />
      </div>
    </div>
  );
}

export default DealsScroller;
