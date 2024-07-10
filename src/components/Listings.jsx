import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `https://dreamhomes-backend.onrender.com/properties?category=${selectedCategory}`
          : "https://dreamhomes-backend.onrender.com/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
      console.log(data);
      
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? <Loader /> : (
        <>
          {listings.length > 0
            ? <div className='listings'>
              {listings.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
                <ListingCard listingId={_id} creator={creator._id} listingPhotoPaths={listingPhotoPaths} city={city} province={province} country={country} category={category} type={type} price={price} booking={booking} />
              ))}
            </div>
            : <div className='noData'>
              No Properties Found
            </div>
          }
        </>
      )}
    </>
  );
};

export default Listings;
