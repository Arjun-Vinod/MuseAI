const express = require('express');
const { registerUser, loginUser } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: `Hello, ${req.user.id}! This is your profile.` });
});

module.exports = router;
