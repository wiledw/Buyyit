import { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import './Marketplace.css'; 

export default function Marketplace() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('offers');

  const queries = {
    'offers': 'Offer',
    'requests': 'Request',
    'academics': 'Academic'
  }

  // reload listings when selected options change
  useEffect(() => {
    console.log(selectedOption);
    fetchAds();
  }, [selectedOption]);

  // fetches all listings for selected listing type from back-end
  const fetchAds = async () => {
    let query = '/fetch' + queries[selectedOption];
    try {
      const response = await axios.get(query);
      const data = response.data;
      setAds(data);
    } catch (error) {
      console.log(query);
      console.log(error);
      toast.error('Failed to fetch posts');
    }
  };

  // fetch all listings, specifies filters for the mongo query
  const fetchFilterAds = async () => {
    try {
      // Construct the query string with filters
      let queryString = `/fetchFilter` + queries[selectedOption] + '?';
      queryString += searchTerm ? `searchTerm=${encodeURIComponent(searchTerm)}&` : '';
      queryString += minPrice ? `minPrice=${encodeURIComponent(minPrice)}&` : '';
      queryString += maxPrice ? `maxPrice=${encodeURIComponent(maxPrice)}&` : '';

      // Trim the last '&' or '?' if necessary
      queryString = queryString.endsWith('&') ? queryString.slice(0, -1) : queryString;
      queryString = queryString.endsWith('?') ? queryString.slice(0, -1) : queryString;

      const response = await axios.get(queryString);
      setAds(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch filtered posts');
    }
  };

  return (
    <div className='content-container'>
      <h2>What would you like to browse?</h2>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="offers">Offers</option>
        <option value="requests">Requests</option>
      </select>
      <div className='search-filters'>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={fetchFilterAds}>Search</button>
      </div>


        <div className='ads-container'>
          {ads.map((ad) => (
                  <div key={ad._id} className="ad">
                  <h3>{ad.itemName}</h3>
                  {ad.sellerName && <p>Seller: {ad.sellerName}</p>}
                  {ad.buyerName && <p>Buyer: {ad.buyerName}</p>}
                  <p>Email: {ad.userEmail}</p>
                  <p>Details: {ad.itemDetails}</p>
                  <p>Price: ${ad.itemPrice}</p>
                  
                  {ad.itemImage && <img src={ad.itemImage} alt={ad.itemName} style={{ width: '100px', height: '100px' }} />}
                  </div>
              ))}
        </div>

    </div>
  );
}