import React, { useContext } from "react";
import FoodCard from "./FoodCard";
import { Address, PlaceName } from "./context-api";
import Filter from "./Filter";

function Body({ Data, title }) {
  const { placeName } = useContext(PlaceName);
  const { address } = useContext(Address);

  return (
    <div className="w-full">
      <div className="w-[75%] h-16 p-3 mx-auto text-3xl justify-between">
        {/* <h1 className="font-bold p-2">{`Restaurants with online food delivery in ${placeName}`}</h1> */}
        <h1 className="font-bold p-2">{title}</h1>
      </div>
      <Filter />
      <div className="grid w-[75%] mt-7 pl-4 mx-auto grid-cols-4 gap-4">
        {Data?.map(({ info, cta: { link } }, index) => (
          <FoodCard key={index} {...info} link={link} />
        ))}
      </div>
    </div>
  );
}

export default Body;
