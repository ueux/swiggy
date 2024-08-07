// Shimmer.jsx
import React from "react";

function Shimmer() {
  return (
    <>
<div className="w-full bg-slate-800 h-[300px] flex justify-center items-center">
        <div className="text-center text-white">
          <div className="relative flex justify-center mb-4">
            <img
              className="absolute w-9 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/frappe_zmntd7"
              alt=""
            />
            <span className="loader p-2"></span>
          </div>
          <h1>Looking for great food near you...</h1>
        </div>
      </div>
     
    </>
  );
}

export default Shimmer;
