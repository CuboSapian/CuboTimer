const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');

const tempKi = 'CuboTimer#Global';

// ROUTE 1 : Create A New User @"/api/auth/createUser".

router.post('/createUser', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('userName').isLength({ min: 3 }),
], async (req, res) => {
  //If errors found in validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with same email already exists" })
    }
    user = await User.findOne({ userName: req.body.userName });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with same UserName already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      userName: req.body.userName,
      password: secPass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, tempKi);
    res.json({ authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

/*
    Router Checks for correctness of Email, UserName, Password. If errors found in validation, they are shown.
    Inside try, we check if email and username are unique or not. If not unique, send Bad Request(400).
    If unique, make the password Secure with bcryptjs and add salt. Perform hashing and create user.
    Using jsonwebtoken, send a token to user with his data as id.
*/

// ROUTE 2 : User Login @/api/auth/login

router.post('/login', [
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
], async (req, res) => {

  //If errors found in validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} =req.body;
  try {
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Wrong Credentials, Please try again"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Wrong Credentials, Please try again"});
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, tempKi);
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 3 : Get User Details using: Post @"/api/auth/getUserInfo".

router.post('/getUserInfo', fetchuser , async (req, res) => {
try {
  userID = req.user.id;
  const user = await User.findById(userID).select("-password");
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error"); 
}
})
module.exports = router