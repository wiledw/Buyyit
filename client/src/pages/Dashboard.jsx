import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    // States for form inputs

    const [formType, setFormType] = useState('buy');
    const [itemType, setItemType] = useState('item');

    const [data, setData] = useState({
        itemName: '',
        buyerName: user.name,
        itemDetails: '',
        itemPrice: '',
        itemImage: null,
    })

    const [data1, setData1] = useState({
        itemName: '',
        sellerName: user.name,
        itemDetails: '',
        itemPrice: '',
        itemImage: null,
    })

    // Handle buy post form submission
    const handleBuyPostSubmit = async (e) => {
        e.preventDefault();
        // Form submission logic here
        // You might want to append form data and send it to your server/API
        const {itemName, buyerName, itemDetails, itemPrice, itemImage} = data;
        try {
            console.log(buyerName)
            const {response} = await axios.post('/postRequest', {
                itemName,
                buyerName,
                itemDetails,
                itemPrice,
                itemImage
            })
            if (response?.data?.error) {
                toast.error(response.data.error)
            } else {
                setData( {
                    itemName: '',
                    buyerName: '',
                    itemDetails: '',
                    itemPrice: '',
                    itemImage: null,
                })
                toast.success('Post Created')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error has occured')
            toast.error('Please make sure image size under 1.5mb')
        }        
    };

    // Handle sell post form submission
    const handleSellPostSubmit = async (e) => {
        e.preventDefault();
        console.log(data1);
        // Form submission logic here
        // You might want to append form data and send it to your server/API
        const {itemName, sellerName, itemDetails, itemPrice, itemImage} = data1;
        try {
            let post = '';
            if (itemType === 'item') {
                post = '/postOffer'
            } else {
                post = '/servicePost'
            }
            const {response} = await axios.post('/postOffer', {
                itemName,
                sellerName,
                itemDetails,
                itemPrice,
                itemImage
            })
            if (response?.data?.error) {
                toast.error(response.data.error);
            } else {
                setData1( {
                    itemName: '',
                    sellerName: '',
                    itemDetails: '',
                    itemPrice: '',
                    itemImage: null,
                })
                toast.success('Post Created')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error has occured')
            toast.error('Please make sure image size under 1.5mb')
        }        
    };

    const handleFileChange = (postType, e) => {
        const file = e.target.files[0];
        convertToBase64(postType, file);
    };

    const convertToBase64 = (postType, file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64data = reader.result;
            if (postType ==='buy'){
                setData({...data, itemImage: base64data})
            } 
            if (postType === 'sell') {
                setData({...data1, itemImage: base64data})
            }
            
        };
    };

    if (formType === 'sell') {
        return (
            <div>
                <div className="page-container">
                    <div className="greeting">{!!user && (<h2>Hi {user.name}! </h2>)}</div>
                    <select value={formType} onChange={(e) => setFormType(e.target.value)}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                    </select>
                    <div className="posts-container">
                        <div className="post-container">
                            <h2>Create item listing:</h2>
                            <form onSubmit={handleSellPostSubmit}>
                                <label>Type:</label>
                                <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                    <option value="item">Item</option>
                                    <option value="service">Service</option>
                                </select>
                                <label>Item Name</label>
                                <input type='text' placeholder='enter item name...' value={data1.itemName} onChange={(e) => setData1({...data1, itemName: e.target.value})} />
                                <label>Item Details</label>
                                <textarea type='text' placeholder='enter item details...' value={data1.itemDetails} onChange={(e) => setData1({...data1, itemDetails: e.target.value})}/>
                                <label>Item Price</label>
                                <input type='number' placeholder='enter item price...' value={data1.itemPrice} onChange={(e) => setData1({...data1, itemPrice: e.target.value})}/>
                                <label>Item Image</label>
                                <input
                                        id="myInput"
                                        type="file"
                                        onChange={(e) => handleFileChange('sell', e)}
                                        accept="image/*"
                                    />
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="page-container">
                    <div className="greeting">{!!user && (<h2>Hi {user.name}! </h2>)}</div>
                    <select value={formType} onChange={(e) => setFormType(e.target.value)}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                    </select>
                    <div className="posts-container">
                        <div className="post-container">
                            <h2>Create request:</h2>
                            <form onSubmit={handleBuyPostSubmit}>
                                <label>Item Name</label>
                                <input type='text' placeholder='enter item name...' value={data.itemName} onChange={(e) => setData({...data, itemName: e.target.value})} />
                                <label>Item Details</label>
                                <textarea type='text' placeholder='enter item details...' value={data.itemDetails} onChange={(e) => setData({...data, itemDetails: e.target.value})}/>
                                <label>Desired Item Price</label>
                                <input type='number' placeholder='enter item price...' value={data.itemPrice} onChange={(e) => setData({...data, itemPrice: e.target.value})}/>
                                <label>Item Image</label>
                                <input
                                        id="myInput"
                                        type="file"
                                        onChange={(e) => handleFileChange('buy', e)}
                                        accept="image/*"
                                    />
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}
