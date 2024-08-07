import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterVal } from "../utilities/filter-splice";

function Filter() {
  const dispatch = useDispatch();
  const filterVal = useSelector((state) => state.filterSplice.filterVal);

  function handleFilterBtn(btn) {
    dispatch(setFilterVal(btn === filterVal ? null : btn));
  }

  const filterCategory = [
    "Fast Delivery",
    "Rating 4.0+",
    "Pure Veg",
    "Offers",
    "Less Than Rs 300",
  ];

  return (
    <div className="w-[75%] mt-3 flex gap-4 pl-4 mx-auto">
      {filterCategory.map((data, i) => (
        <button
          key={i}
          className={`cursor-pointer flex items-center filterBtn ${
            filterVal === data ? "activeFilterBtn" : ""
          }`}
          onClick={() => handleFilterBtn(data)}
        >
          {data}
          <i className="hidden fi fi-br-cross text-xs ml-2" />
        </button>
      ))}
    </div>
  );
}

export default Filter;
