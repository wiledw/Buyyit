const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser, authenticateToken} = require('../controllers/authController')
const {buyingPost, sellingPost, fetchBuyingPost, fetchFilterBuyingPost, fetchSellingPost, fetchFilterSellingPost} = require('../controllers/Post')

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/logout', logoutUser)

router.post('/buyPost', authenticateToken, buyingPost)
router.post('/sellPost', authenticateToken, sellingPost)
router.get('/fetchBuyPost', fetchBuyingPost)
router.get('/fetchFilterBuyPost', fetchFilterBuyingPost)
router.get('/fetchSellPost', fetchSellingPost)
router.get('/fetchFilterSellPost', fetchFilterSellingPost)


module.exports = router