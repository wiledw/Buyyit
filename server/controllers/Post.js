const request = require('../models/request')
const offer = require('../models/offer')


const postOffer = async (req, res) => {
    try {
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
       const post = await offer.create({
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

const postRequest = async (req, res) => {
    try{
       const {itemName, buyerName, itemDetails, itemPrice, itemImage} = req.body;
       console.log(itemImage)
       if(!itemName){
        return res.json({
            error: 'Please fill in item name'
        })
       }
       if(!buyerName){
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
       const post = await request.create({
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

// Fetch offer part

const fetchOffer = async (req, res) => {
    try {
        const posts = await offer.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

const fetchFilterOffer = async (req, res) => {
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

        const posts = await offer.find(queryConditions);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch offers:', error);
        res.status(500).json({ message: 'Failed to fetch offers due to an error.' });
    }
};

// Fetch selling part

const fetchRequest = async (req, res) => {
    try {
        const posts = await request.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

const fetchFilterRequest = async (req, res) => {
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

        const posts = await request.find(queryConditions);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch requests:', error);
        res.status(500).json({ message: 'Failed to fetch requests due to an error.' });
    }
};

module.exports = {postOffer,postRequest,fetchOffer, fetchFilterOffer, fetchRequest, fetchFilterRequest};