import React, { useState } from "react";
import SingleMenuCard from "./Single-menu-card";


function Menucard({ card: { categories, itemCards, title }, resData }) {
  const [isOpen, setIsOpen] = useState(true);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (itemCards) {
    return (

      <div className="text-2xl">

        <SingleMenuCard itemCards={itemCards} resData={resData} title={title} />
      </div>
    );
  }

  if (categories) {
    return (
      <div className="bg-white ">
        <div className="relative p-7">
          <h1 className="font-bold text-2xl">
            {title} ({categories.length})
          </h1>
        </div>
        {isOpen && (
          <div>
            {categories.map(({ itemCards, title }, index) => (
              <div key={index} className="text-xl">
                <SingleMenuCard itemCards={itemCards} resData={resData} title={title} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default Menucard;
