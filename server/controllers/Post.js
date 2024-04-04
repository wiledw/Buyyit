const User = require('../models/user')
const admin = require('../models/admin')
const request = require('../models/request')
const offer = require('../models/offer')
const academic = require('../models/academic')


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

const postAcademic = async (req, res) => {
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
       const post = await academic.create({
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

const fetchAcademic = async (req, res) => {
    try {
        const posts = await academic.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
}

const fetchFilterAcademic = async (req, res) => {
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

        const posts = await academic.find(queryConditions);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Failed to fetch offers:', error);
        res.status(500).json({ message: 'Failed to fetch offers due to an error.' });
    }
};

const isAdmin = async(req, res) => {
    try {
        // Check if the user is an admin
        const user = req.user;
        const target = await admin.findOne({email: user.email});

        if(target){
            console.log('Person is an admin');
            return res.json({isAdmin: true});
        } else {
            console.log('Person is not an admin');
            return res.json({isAdmin: false});
        }
    } catch (error) {
        console.log(error);
    }
    
};

const deleteUser = async (req, res) => {
    try {
        const targetEmail = req.body.email;
        console.log(targetEmail);
        const user = await User.findOne({email: targetEmail});

        const sender = req.user.email;
        console.log(sender);

        const senderAdmin = await admin.findOne({email: sender});

        if(!senderAdmin){
            return res.json({message: 'You are not an admin'});
        }

        if(user){
            if(sender === targetEmail){
                // Send a failed response
                return res.json({message: 'You cannot delete yourself'});
            }

            // Remove user
            await User.findOneAndDelete({email: targetEmail});

            // Remove user if they are an admin
            await admin.findOneAndDelete({email: targetEmail});

            // Delete user posts
            await buyPost.deleteMany({userEmail: targetEmail});
            await sellPost.deleteMany({userEmail: targetEmail});
            //TODO: Delete academic services

            console.log('User deleted successfully');

            return res.json({message: 'User deleted successfully'});
        }

        console.log('User not found');
        // If the user does not exist
        return res.json({message: 'User not found'});
    } catch (error) {
        console.log(error);
    }

}

const makeAdmin = async (req, res) => {
    try {
        const targetEmail = req.body.email;
        
        // Check if the person making the request is an admin
        const userAdmin = await admin.findOne({email: req.user.email});
        if(!userAdmin){
            return res.json({message: 'You are not an admin'});
        }

        // Check if the user exists
        const userToMakeAdmin = await User.findOne({email: targetEmail});
        console.log(targetEmail);
        console.log(userToMakeAdmin);
        if(userToMakeAdmin){
            // Check if the user is already an admin
            const targetAdmin = await admin.findOne({email: targetEmail});
            if(targetAdmin){
                return res.json({message: 'User is already an admin'});
            }

            await admin.create({email: targetEmail});

            return res.json({message: 'User is now an admin'});
        }

        // If the user does not exist
        return res.json({message: 'User not found'});


    } catch (error) {
        console.log(error);
    }
        
}

const removeAdmin = async (req, res) => {
    try {
        const  email = req.body.email;
        
        // Check if the person making the request is an admin
        const user = await User.findOne({email: req.user.email});
        const userAdmin = await admin.findOne({email: req.user.email});
        if(!userAdmin){
            return res.json({message: 'You are not an admin'});
        }

        // Check if the user exists
        const target = await admin.findOne({email});

        if(!target){
            return res.json({message: 'User is not an admin'});
        }

        if(target.email === req.user.email){
            return res.json({message: 'You cannot remove yourself as an admin'});
        }

        await admin.findOneAndDelete({email});

        return res.json({message: 'User is no longer an admin'});

    } catch (error) {
        console.log(error);
    }

}


module.exports = {postOffer,postRequest,postAcademic, fetchOffer, fetchFilterOffer, fetchAcademic, fetchFilterAcademic, fetchRequest, fetchFilterRequest, isAdmin, deleteUser, makeAdmin, removeAdmin};
