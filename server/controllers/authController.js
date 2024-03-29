const User = require('../models/user')
const {hashPassword, comparePasswords} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

// Register user endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check for missing information
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }; 
        if (!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        const exist = await User.findOne({email})
        if (exist){
            return res.json({
                error: 'Email is taken already'
            })
        };

        // Hashing
        const hashedPassword = await hashPassword(password)
        // Create user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })

        return res.json(user);
    } catch (error) {
        console.log(error)
    }
}

// Login user endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // Check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: 'No user found'
            })
            
        }
        // check is passwords match
        const match = await comparePasswords(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            });
        }
        if(!match){
            res.json({
                error: "Passwords do not match"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.status(202).clearCookie('token').send('cookie cleared')
}

const authenticateToken = (req, res, next) => {
    // Assuming the token is stored in a cookie named 'token'
    const token = req.cookies.token;
    console.log(token);
    if (token == null) return res.sendStatus(401); // if no token found
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) throw err; // invalid token
      req.user = user; // Add the decoded token to the request so it can be used in the endpoint
      next(); // proceed to the next middleware or route handler
    });
  };


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    authenticateToken
}