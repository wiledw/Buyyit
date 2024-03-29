const buyPost = require('../models/buyPost')
const sellPost = require('../models/sellPost')


const buyingPost = async (req, res) => {
    try {
       const {itemName, buyerName, itemDetails, itemPrice, itemImage} = req.body;
       console.log(itemImage)
       if(!itemName){
            return res.json({
                error: 'Please fill in item name'
            })
       }
       if(!buyerName){
        return res.json({
            error: 'Please fill in buyer name'
        })
       }
       if(!itemDetails){
        return res.json({
            error: 'Please fill in item details'
        })
       }
       if(!itemPrice){
        return res.json({
            error: 'Please fill in item price'
        })
       }
       
       const userEmail = req.user.email;
       console.log(userEmail);
       const post = await buyPost.create({
            itemName,
            buyerName,
            userEmail,
            itemDetails,
            itemPrice,
            itemImage
       });

       return res.json(post);

    } catch (error) {
        console.log(error)
    }
}

const sellingPost = async (req, res) => {
    try{
       const {itemName, sellerName, itemDetails, itemPrice, itemImage} = req.body;
       console.log(itemImage)
       if(!itemName){
        return res.json({
            error: 'Please fill in item name'
        })
       }
       if(!sellerName){
        return res.json({
            error: 'Please fill in seller name'
        })
       }
       if(!itemDetails){
        return res.json({
            error: 'Please fill in item details'
        })
       }
       if(!itemPrice){
        return res.json({
            error: 'Please fill in item price'
        })
       }
       
       const userEmail = req.user.email;
       console.log(userEmail);
       const post = await sellPost.create({
            itemName,
            sellerName,
            userEmail,
            itemDetails,
            itemPrice,
            itemImage
       });

       return res.json(post);

    } catch (error) {
        console.log(error)
    }
}

// Fetch buying part

const fetchBuyingPost = async (req, res) => {
    try {
        const posts = await buyPost.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

const fetchFilterBuyingPost = async (req, res) => {
    try {
        // Extract query parameters
        const { searchTerm, minPrice, maxPrice } = req.query;

        // Build a query object to hold your search conditions
        let queryConditions = {};
        
        if (searchTerm) {
            // Assuming you want to search within the itemName and itemDetails fields
            queryConditions.$or = [
                { itemName: { $regex: searchTerm, $options: 'i' } },
                { itemDetails: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        
        if (minPrice) {
            queryConditions.itemPrice = { ...queryConditions.itemPrice, $gte: Number(minPrice) };
        }
        
        if (maxPrice) {
            queryConditions.itemPrice = { ...queryConditions.itemPrice, $lte: Number(maxPrice) };
        }

        const posts = await buyPost.find(queryConditions);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch buying posts:', error);
        res.status(500).json({ message: 'Failed to fetch buying posts due to an error.' });
    }
};

// Fetch selling part

const fetchSellingPost = async (req, res) => {
    try {
        const posts = await sellPost.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

const fetchFilterSellingPost = async (req, res) => {
    try {
        // Extract query parameters
        const { searchTerm, minPrice, maxPrice } = req.query;

        // Build a query object to hold your search conditions
        let queryConditions = {};
        
        if (searchTerm) {
            // Assuming you want to search within the itemName and itemDetails fields
            queryConditions.$or = [
                { itemName: { $regex: searchTerm, $options: 'i' } },
                { itemDetails: { $regex: searchTerm, $options: 'i' } }
            ];
        }
        
        if (minPrice) {
            queryConditions.itemPrice = { ...queryConditions.itemPrice, $gte: Number(minPrice) };
        }
        
        if (maxPrice) {
            queryConditions.itemPrice = { ...queryConditions.itemPrice, $lte: Number(maxPrice) };
        }

        const posts = await sellPost.find(queryConditions);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch selling posts:', error);
        res.status(500).json({ message: 'Failed to fetch selling posts due to an error.' });
    }
};

module.exports = {buyingPost,sellingPost,fetchBuyingPost, fetchFilterBuyingPost, fetchSellingPost, fetchFilterSellingPost};