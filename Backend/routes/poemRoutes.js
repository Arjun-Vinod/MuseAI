const express = require('express');
const axios = require('axios');
const Poem = require("../model/Poem");
const User = require("../model/User");
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

router.post('/generate', authMiddleware, async (req, res) => {
    let { prompt, style } = req.body;

    if (!prompt) return res.status(400).send("Prompt is required");

    
    if (!style) {
        style = "a short, rhyming poem";
    }

    
    const enhancedPrompt = `Write ${style} about ${prompt}. Make it lyrical, expressive, and creative.`;

    try {
        
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API}`,
            {
                contents: [
                    { parts: [{ text: enhancedPrompt }] }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

       
        const poem = response.data.candidates[0]?.content?.parts[0]?.text?.trim() || "No poem generated";
        

        const newPoem = new Poem({ user: req.user.id, prompt, poem });
        await newPoem.save();


        await User.findByIdAndUpdate(req.user.id, { $push: { poems: newPoem._id } });

        res.status(201).send(newPoem);
    } catch (error) {
        console.error("Error generating poem:", error.response?.data || error.message);
        res.status(500).send("Failed to generate poem");
    }
});

router.get("/history", authMiddleware, async (req, res) => {
    try {
        const poems = await Poem.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(poems);
    } catch (error) {
        console.error("Error fetching poem history:", error.message);
        res.status(500).json({ message: "Failed to fetch history" });
    }
});

module.exports = router;
