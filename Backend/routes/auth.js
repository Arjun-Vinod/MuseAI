const express = require('express');
const { registerUser, loginUser } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authMiddleware'); 
const User = require("../model/User");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password").populate("poems");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});

module.exports = router;
