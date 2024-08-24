const express = require("express");
const router = express.Router();
const User = require("../../modals/user");
const { jwtAuthMiddleware, generateToken } = require("./jwt");
const bcrypt = require("bcrypt");
const { Aggregate } = require("mongoose");



router.post("/register", async (req, res) => {
  try {
    const data = req.body; 
    const existingUser = await User.findOne({
      email: data.email,
    });
    if (existingUser) {  
      return res
        .status(400)
        .json({
          error: "User already exists",
        });
    }

    // Create a new User document using the Mongoose model
    const newpassword = await bcrypt.hash(data.password, 10);

    // Create a new User document using the Mongoose model
    const newUser = new User({
      name: data.name,
      email: data.email,
      phoneNumber : data.phoneNumber,
      password: newpassword,
      isMentor: data.isMentor,
      availability: data.availability,
      roles: data.roles
    });
  
    // Save the new user to the database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log(token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  console.log(req.body.email);
  try {
    // Extract aadharCardNumber and password from request body
    const { email, password } = req.body;

    // Check if aadharCardNumber or password is missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email: email });
    // If user does not exist or password does not match, return error
    const response = await bcrypt.compare(user.password,password);
    const isPasswrod = await bcrypt.compare(password, user.password);

    if (!isPasswrod) {
      return res.status(500).json({ error: "Invalid Password" });
    }
    // generate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    req.user = token;
    res.cookie({'token':token})
    // return token as response
    res.json({ message: "User login successful!", token: token, candidate: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post('/logout', async (req, res) => {
    console.log("logout route")
     try {
      res.status(200).json({ msg: 'Logged out Successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})
  
router.patch("/check-auth", (req, res) => {
  // Check if the user is authenticated
  console.log("route hit");
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
