import { useParams } from "react-router-dom";
import "../styles/List.scss"
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)

  const dispatch = useDispatch()

  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://dreamhomes-backend.onrender.com/properties/search/${search}`, {
        method: "GET"
      })

      const data = await response.json()
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      {listings.length > 0
        ? <div className="list">
          {listings?.map(({ _id, creator, listingPhotoPaths, city, province, country, category, type, price, booking = false }) => (
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
          There are no properties matching your search criteria
        </div>
      }
      <Footer />
    </>
  );
}

export default SearchPage