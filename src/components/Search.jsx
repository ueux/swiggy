import React, { useContext, useEffect, useState } from "react";
import { Coordinates } from "./context-api";
import FoodCard2 from "./Food-Card-2";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeAll } from "../utilities/cart-slice";
import toast from "react-hot-toast";
import { setFirtItem, setIsDiffRes } from "../utilities/dif-res";
import FoodCard3, { withHOC } from "./Food-Card-3";
import { setResults } from "../utilities/search-slice";
import { toggleMoreDishes } from "../utilities/toogle-slice";
import AddBtn from "./Add-btn";
import Filter from "./Filter";
import { Link } from "react-router-dom";

function Search() {
  const [suggestions, setSuggestions] = useState([]);

  const [moreDishes, setMoreDishes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [resturantData, setResturantData] = useState([]);

  const PromotedRestaurent=withHOC(FoodCard3)

  const [input, setInput] = useState("");
  // const [results, setResults] = useState([]);

  const results = useSelector((state) => state.resultsSlice.results);
  const [moreLikeThis, setMoreLikeThis] = useState([]);
  const [type, setType] = useState("");
  const {
    coordinates: { lat, lng },
  } = useContext(Coordinates);
  const isDiffRes = useSelector((state) => state.diffResSlice.isDiffRes);
  const firstItem = useSelector((state) => state.diffResSlice.firstItem);

  const moreDishesToggle = useSelector(
    (state) => state.ToogleSlice.moreDishesToggle.status
  );
  const moreDishesURLData = useSelector(
    (state) => state.ToogleSlice.moreDishesToggle.URLkeys
  );
  const { itemName, itemId, resId, city, restaurant } =moreDishesURLData
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(removeAll());
    toast.success("All Cleared");
  };

  async function fetchSimilerDishes() {
    // console.log("fetching data")
    const resPlaceURL = encodeURIComponent(`/city/${city}/${restaurant}`);
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${itemName}&trackingId=undefined&submitAction=SUGGESTION&selectedPLTab=dish-add&restaurantMenuUrl=${resPlaceURL}-rest${resId}%3Fquery%3DPunjabi%2BAngithi%2B%2528Vegorama%2BGroup%2529&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A465050%2C%22primaryRestaurantId%22%3A326429%2C%22cloudinaryId%22%3A%22lgfkquq3npd3r9oiy62b%22%2C%22brandId%22%3A465050%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D`
    );
    let res = await data.json();
    console.log(res)
    setResturantData(
      res.data.cards.filter((data) => data.card.card.restaurant?.info)[0].card
        .card.restaurant.info
    );
    setDishes(
      res.data.cards.filter((data) => data.card.card.cards)[0].card.card.cards
    );
    // console.log(dishes);
    dispatch(toggleMoreDishes());
  }

  function setMoreDishData() {
    dishes.map(({ card: { info } }) => {
      setMoreDishes((pre) => [...pre, { ...info, resData: resturantData }]);
    });
    console.log(moreDishes);
  }

  useEffect(() => {
    if (dishes.length > 0) {
      setMoreDishData();
    }
  }, [dishes]);

  useEffect(() => {
    if (moreDishesToggle) fetchSimilerDishes();
  }, [moreDishesToggle]);

  const fetchSuggestions = async (val) => {
    setInput(val);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${val}&trackingId=null&includeIMItem=true`
      );
      const data = await res.json();
      // console.log(data);
      setSuggestions(data.data.suggestions);
    } catch (error) {
      // console.error("Error fetching suggestions:", error)
    }
  };

  const fetchDishResults = async (input) => {
    if (!input?.text) return;
const { text, field }=input
    setInput({ text, field });
    setSuggestions([]);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${text}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=0952657b-aa4d-b67a-4b2c-80eb4fe55ecb&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22z5s9vrflt9bnyqwgvbo3%22%2C%22dishFamilyId%22%3A%22846647%22%2C%22dishFamilyIds%22%3A%5B%22846647%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D${
          field === "RESTAURANT" ? "&selectedPLTab=DISH" : ""
        }`
      );
      const data = await res.json();
      // console.log(data);
      setType("DISH");
      field === "RESTAURANT"
        ? dispatch(
            setResults(
              data.data.cards[0].groupedCard.cardGroupMap.DISH.cards.filter(
                (item) => item?.card.card.restaurant?.info
              )
            )
          )
        : dispatch(
            setResults(
              data.data.cards[1].groupedCard.cardGroupMap.DISH.cards.filter(
                (item) => item?.card.card.restaurant?.info
              )
            )
          );
    } catch (error) {
      // console.error("Error fetching search results:", error);
    }
  };

  const fetchRessResults = async (input) => {
    if (!input?.text) return;
const { text, field }=input
    setInput({ text, field });
    setSuggestions([]);
    try {
      const res = await fetch(
        `${
          field === "DISH"
            ? `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${text}&trackingId=undefined&submitAction=ENTER&queryUniqueId=d417f099-b6f1-81d2-974f-aaf73d18f9a1&selectedPLTab=RESTAURANT`
            : `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${encodeURIComponent(
                text
              )}&trackingId=997ab323-31ad-c3ec-b7db-1e476c126df8&submitAction=ENTER&queryUniqueId=85e9882c-9ebc-dfce-2490-1d480cfb4630`
        }`
      );
      const data = await res.json();
      // console.log(data);
      setType("RESTAURANT");
      {
        field === "DISH" ? (
          dispatch(
            setResults(
              data.data.cards[0].groupedCard.cardGroupMap.RESTAURANT.cards.filter(
                (item) => item?.card.card.info
              )
            )
          )
        ) : (
          <>
            {dispatch(
              setResults(
                data.data.cards[1].groupedCard.cardGroupMap.RESTAURANT.cards.filter(
                  (item) => item?.card.card.info
                )
              )
            )}
            {setMoreLikeThis(
              data.data.cards[1].groupedCard.cardGroupMap.RESTAURANT.cards.filter(
                (item) => item?.card.card.restaurants
              )
            )}
          </>
        );
      }
    } catch (error) {
      // console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchDishResults();
    fetchRessResults();
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    fetchSuggestions(e.target.value);
  };

  return (
    <>
      {isDiffRes && (
        <div className="w-[620px] h-[254px] bottom-10 ml-[35%] flex-col justify-center items-center bg-white border z-50 shadow-2xl opacity-100 p-5 fixed">
          <h1 className="mt-2 font-bold">Items already in cart</h1>
          <p className="my-7 text-gray-500 text-xl">
            Your cart contains items from another restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex justify-between">
            <button
              className="w-64 h-14 text-xl bg-white border-2 text-lime-600 border-lime-600"
              onClick={() => {
                dispatch(setIsDiffRes(false));
                dispatch(setFirtItem(""));
              }}
            >
              NO
            </button>
            <button
              className="ml-14 w-64 h-14 text-xl text-white bg-lime-600 border border-lime-500"
              onClick={() => {
                clearCart();
                dispatch(setIsDiffRes(false));
                // console.log(firstItem);
                let newData = { ...firstItem, resData: firstItem.resData.info };
                dispatch(addToCart([newData]));

                dispatch(
                  setResults([
                    {
                      card: {
                        card: {
                          info: firstItem,
                          restaurant: firstItem.resData,
                        },
                      },
                    },
                  ])
                );
                dispatch(toggleMoreDishes());
              }}
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col items-center p-6 bg-white min-h-screen">
        <div className="w-[65%] bg-white  rounded-lg  ">
          <div className="relative">
            {input && (
              <i
                onClick={() => fetchDishResults(input)}
                className={`absolute cursor-pointer bottom-2 left-2 fi text-3xl mt-1 fi-rs-angle-small-left`}
              />
            )}
            <input
              onInput={(e) => {
                dispatch(setResults([]));
                setType("");
                handleInput(e);
              }}
              value={input.text}
              type="text"
              placeholder="Search for restaurants and food"
              className="border border-gray-300 rounded-lg p-4 pl-11 w-full text-lg focus:outline-none transition duration-300"
            />
            <i className="absolute bottom-1/4 right-8 text-xl fi fi-rr-search" />
          </div>

          <div className="mt-4">
            {suggestions.length > 0 && input && (
              <div className="bg-white rounded-lg  p-2">
                {suggestions.map(({ cloudinaryId, text, type }) => (
                  <div
                    key={text}
                    onClick={() => {
                      setType(type);
                      type === "RESTAURANT"
                        ? fetchRessResults({ text, field: type })
                        : fetchDishResults({ text, field: type });
                    }}
                    className="cursor-pointer flex items-center gap-4 p-4 hover:bg-gray-100 transition duration-300"
                  >
                    <img
                      className="w-16 h-16 rounded-md object-cover"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${cloudinaryId}`}
                      alt={text}
                    />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-semibold">{text}</h1>
                      <h2 className="text-gray-500">{type}</h2>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div>
              {results.length > 0 && input&& (
                <>
                  <div className="flex  gap-4">
                    <button
                      onClick={() => {
                        fetchRessResults(input);
                      }}
                      className={
                        "cursor-pointer flex items-center filterBtn" +
                        (type === "RESTAURANT" ? " activeFilterBtn" : "")
                      }
                    >
                      Restaurants
                    </button>
                    <button
                      onClick={() => {
                        fetchDishResults(input);
                      }}
                      className={
                        "cursor-pointer flex items-center filterBtn" +
                        (type === "DISH" ? " activeFilterBtn" : "")
                      }
                    >
                      Dishes
                    </button>
                  </div>
                  <div className="my-5 h-screen overflow-y-scroll hide-scrollbar bg-gray-100">
                    <div className="flex flex-wrap w-[100%] pl-4 py-4 bg-gray-100 gap-4 mt-4">
                      {/* {console.log(results)} */}
                      {results.map(
                        ({
                          card: {
                            card: { info, restaurant },
                          },
                        }) =>
                          type === "DISH" ? (
                            <FoodCard2
                              key={info.id}
                              info={info}
                              restaurant={restaurant}
                            />
                          ) : (
                            <>
                              <FoodCard3 key={info.id} info={info} />

                              {input.field === "RESTAURANT" ? (
                                <>
                                  <h1 className="w-[100%] ml-8 mt-9 text-lg font-semibold">
                                    More results like this
                                  </h1>
                                  <div className="flex w-[100%] flex-wrap  gap-4 mt-4">
                                    {moreLikeThis[0].card.card.restaurants.map(
                                      ({ info }) => (
                                        info.promoted ? (console.log(PromotedRestaurent), <PromotedRestaurent info={info } />):
                                        <FoodCard3 key={info.id} info={info} />
                                      )
                                    )}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          )
                      )}
                    </div>
                    {moreDishes.length > 0 && (
                      <>
                        <h1 className="text-xl ml-10 mt-4">
                          More dishes from this restaurant
                        </h1>
                        <div className="flex flex-wrap w-[100%] p-4 bg-gray-100 gap-8 mt-4">
                          {moreDishes.map((items, index) => {
                            if (index > 9) return;
                            const {
                              name,
                              price,
                              defaultPrice,
                              isVeg,
                              imageId,
                            } = items;
                            // console.log(moreDishes);
                            // const ratings=`${items.ratings.aggregatedRating.rating} (${items.ratings.aggregatedRating.ratingCountV2})`
                            return (
                              <>
                                <div
                                  key={index}
                                  className="font-semibold  w-[540px] ml-2 rounded-3xl flex shadow-lg bg-white text-xl  "
                                >
                                  <div className="w-[250px] p-5">
                                    {isVeg === 1 ? (
                                      <img
                                        className="w-6"
                                        src="https://clipground.com/images/veg-logo-png-6.png"
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="w-6"
                                        src="https://www.pinclipart.com/picdir/big/419-4194820_veg-icon-png-non-veg-logo-png-clipart.png"
                                        alt=""
                                      />
                                    )}
                                    <h2 className="font-bold text-gray-700">
                                      {name}
                                    </h2>
                                    <p className="text-[18px] font-bold">
                                      ₹ {(defaultPrice || price) / 100}
                                    </p>
                                    {/* {ratings && (
                                      <p className="text-sm flex items-center gap-1 my-2 font-bold text-lime-600">
                                        <i className="fi fi-ss-star mt-1" />
                                        <span>{ratings}</span>
                                      </p>
                                    )} */}
                                  </div>
                                  <div className="relative justify-center items-center">
                                    {imageId ? (
                                      <>
                                        <img
                                          className="rounded-2xl ml-14 mt-6  mb-10 w-[180px] h-[180px] object-cover"
                                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                                          alt=""
                                        />

                                        <AddBtn
                                          info={items}
                                          css={
                                            "absolute cursor-pointer flex text  justify-center shadow-sm items-center text-lime-700 h-12 w-36 bottom-5 left-16 ml-3 pb-1 rounded-xl border bg-white"
                                          }
                                        />
                                        {items.variants?.variantGroups && (
                                          <div className="text-base absolute bottom-0 left-24 m-0 p-0 font-light">
                                            Customisable
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <AddBtn
                                        info={items}
                                        css={
                                          "absolute cursor-pointer flex text justify-center shadow-sm items-center text-lime-700 h-12 w-36 bottom-1/2 left-20 ml-3 pb-1 rounded-xl border bg-white"
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {moreDishes.length > 0 && toggleMoreDishes && input && (
                          <Link to={`/rest-menu/${resId}`}>
                            <div className="w-full bg-white">
                              <br />
                              <div className="w-[96%]  border-2 border-orange-300 flex justify-center text-orange-300 rounded-xl text-xl p-5 items-center h-8">
                                See full menu
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
