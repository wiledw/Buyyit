import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [adminResponse, setAdminResponse] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    // States for form inputs

    const [formType, setFormType] = useState('buy');
    const [itemType, setItemType] = useState('item');

    // stores current data for posting a buy/request listing
    const [data, setData] = useState({
        itemName: '',
        buyerName: user.name,
        itemDetails: '',
        itemPrice: '',
        itemImage: null,
    })

    // stores current data for posting a sell/offer listing
    const [data1, setData1] = useState({
        itemName: '',
        sellerName: user.name,
        itemDetails: '',
        itemPrice: '',
        itemImage: null,
    })

    useEffect(() => {
        requestAdmin();
    }, []);

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
                post = '/postAcademic'
            }
            const {response} = await axios.post(post, {
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

    // process attached file to base 64
    const handleFileChange = (postType, e) => {
        const file = e.target.files[0];
        convertToBase64(postType, file);
    };

    // helper function, convert file into raw data to be stored in mongo
    const convertToBase64 = (postType, file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64data = reader.result;
            if (postType ==='buy'){
                setData({...data, itemImage: base64data})
            } 
            if (postType === 'sell') {
                setData1({...data1, itemImage: base64data})
            }
            
        };
    };

    // Request admin privileges
    const requestAdmin = async () => {

        try {
            // Get user token
            const token = document.cookie.substring(6);

            console.log(user)
            // Send request to server
            const response = await axios.get('/requestAdmin', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // See if user is admin
            if (response?.data?.isAdmin) {
                // Make admin components visible
                console.log('Admin')
                setIsAdmin(true);
            }

        } catch (error) {
            setIsAdmin(false);
        }

        console.log('Not Admin')
        return false;

    }


    // Manipulate user based on the request
    const manipulateUser = async (request) => {


        const uEmail = document.getElementById('userEmail').value;
        console.log(uEmail);
        
        const token = document.cookie.substring(6);

        console.log(request);

    
        try {
        
            // Send request to server
            const response = await axios.post(request, {
                email: uEmail
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Display result message
            setAdminResponse(response.data.message);

        } catch (error) {
            console.log(error)
        }


    }


    // display different form depending on whether user wants to buy or sell
    if (formType === 'sell') {
        return (
            <div>
                <div className="page-container">
                    <div className="greeting">{!!user && (<h2>Hi {user.name}! </h2>)}</div>
                    <h2>What would you like to list?</h2>
                    <select value={formType} onChange={(e) => setFormType(e.target.value)}>
                            <option value="buy">Request</option>
                            <option value="sell">Offer</option>
                    </select>
                    <div className="posts-container">
                        <div className="post-container">
                            <h2>Create offer listing:</h2>
                            <form onSubmit={handleSellPostSubmit}>
                                <label>Type:</label>
                                <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                                    <option value="item">Item</option>
                                    <option value="service">Academic Service</option>
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
                    {isAdmin && (<div className="admin-container">
                    <h2>Admin Panel</h2><br />
                    <input type='email' placeholder='enter email...' id='userEmail' /> <br />
                    <input type='button' value='Delete User' onClick={(e) => manipulateUser('/deleteUser')} />
                    <input type='button' value='Make Admin' onClick={(e) => manipulateUser('/makeAdmin')} />
                    <input type='button' value='Remove Admin' onClick={(e) => manipulateUser('/removeAdmin')} />
                    <p id='adminResponse'>{adminResponse}</p>
                    </div>) }
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="page-container">
                    <div className="greeting">{!!user && (<h2>Hi {user.name}! </h2>)}</div>
                    <h2>What would you like to list?</h2>
                    <select value={formType} onChange={(e) => setFormType(e.target.value)}>
                            <option value="buy">Request</option>
                            <option value="sell">Offer</option>
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
                    {isAdmin && (<div className="admin-container">
                    <h2>Admin Panel</h2><br />
                    <input type='email' placeholder='enter email...' id='userEmail' /> <br />
                    <input type='button' value='Delete User' onClick={(e) => manipulateUser('/deleteUser')} />
                    <input type='button' value='Make Admin' onClick={(e) => manipulateUser('/makeAdmin')} />
                    <input type='button' value='Remove Admin' onClick={(e) => manipulateUser('/removeAdmin')} />
                    <p id='adminResponse'>{adminResponse}</p>
                </div>) }
                </div>
            </div>
        );
    }
}
