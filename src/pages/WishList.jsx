import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      {wishList.length > 0
        ? <div className="list">
          {wishList?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
            <ListingCard
              listingId={_id}
              creator={creator._id}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              type={type}
              price={price}
              booking={booking}
            />
          ))}
        </div>
        : <div className='no_data'>
          No items in your wish list yet
        </div>
      }
      <Footer />
    </>
  );
};

export default WishList;
