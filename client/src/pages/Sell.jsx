import { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import './Buy.css'; 

export default function Buy() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('');


  // Fetch ads from backend
  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (selectedOption === 'buy') {
      console.log('Fetching buy posts');
    } else if (selectedOption === 'sell') {
      console.log('Fetching sell posts');
    }
    else if (selectedOption === 'academics') {
      console.log('Fetching academic posts');
    }
  }, [selectedOption]);

  const fetchAds = async () => {
    try {
      const response = await axios.get('/fetchSellPost');
      const data = response.data;
      setAds(data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch posts');
    }
  };

  const fetchFilterSellingAds = async () => {
    try {
      // Construct the query string with filters
      let queryString = `/fetchFilterSellPost?`;
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
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="academics">Academics</option>
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
        <button onClick={fetchFilterSellingAds}>Search</button>
      </div>


        <div className='ads-container'>
          {ads.map((ad) => (
                  <div key={ad._id} className="ad">
                  <h3>{ad.itemName}</h3>
                  <p>Seller: {ad.sellerName}</p>
                  <p>Email: {ad.userEmail}</p>
                  <p>Details: {ad.itemDetails}</p>
                  <p>Price: ${ad.itemPrice}</p>
                  <img src={ad.itemImage} alt={ad.itemName} style={{ width: '100px', height: '100px' }} />
                  </div>
              ))}
        </div>

    </div>
  );
}
