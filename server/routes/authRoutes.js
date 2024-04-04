const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser, authenticateToken} = require('../controllers/authController')
const {postOffer, postRequest, postAcademic, fetchOffer, fetchFilterOffer, fetchAcademic, fetchFilterAcademic, fetchRequest, fetchFilterRequest} = require('../controllers/Post')

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

router.post('/postOffer', authenticateToken, postOffer)
router.post('/postRequest', authenticateToken, postRequest)
router.post('/postAcademic', authenticateToken, postAcademic)
router.get('/fetchOffer', fetchOffer)
router.get('/fetchFilterOffer', fetchFilterOffer)
router.get('/fetchFilterAcademic', fetchFilterAcademic)
router.get('/fetchRequest', fetchRequest)
router.get('/fetchFilterRequest', fetchFilterRequest)
router.get('/fetchFilterAcademic', fetchFilterAcademic)

module.exports = router