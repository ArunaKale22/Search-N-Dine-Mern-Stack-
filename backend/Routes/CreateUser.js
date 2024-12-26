const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const jwtSecret = "Thisprojectnameissearndine$#"
router.post(
  "/createUser",
  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Please enter correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(req.body.password,userData.password)
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Please enter correct credentials" });
      }

      const data = {
        user:{
          id: userData.id 
        }
      }

      const authToken = jwt.sign(data,jwtSecret)
      return res.json({ success: true, authToken:authToken });
    } catch {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
