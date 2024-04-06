const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser, authenticateToken} = require('../controllers/authController');
const {postOffer, postRequest, postAcademic, fetchOffer, fetchFilterOffer, fetchAcademic, fetchFilterAcademic, fetchRequest, fetchFilterRequest, deleteRequest, deleteOffer, deleteAcademic, isAdmin, deleteUser, makeAdmin, removeAdmin} = require('../controllers/Post')

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

router.get('/requestAdmin', authenticateToken, isAdmin)
router.post('/deleteUser', authenticateToken, deleteUser)
router.post('/makeAdmin', authenticateToken, makeAdmin)
router.post('/removeAdmin', authenticateToken, removeAdmin)


router.post('/postOffer', authenticateToken, postOffer)
router.post('/postRequest', authenticateToken, postRequest)
router.post('/postAcademic', authenticateToken, postAcademic)
router.post('/deleteOffer', deleteOffer)
router.post('/deleteRequest', deleteRequest)
router.post('/deleteAcademic', deleteAcademic)
router.get('/fetchOffer', fetchOffer)
router.get('/fetchFilterOffer', fetchFilterOffer)
router.get('/fetchAcademic', fetchAcademic)
router.get('/fetchFilterAcademic', fetchFilterAcademic)
router.get('/fetchRequest', fetchRequest)
router.get('/fetchFilterRequest', fetchFilterRequest)

module.exports = router