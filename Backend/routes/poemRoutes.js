const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

router.post('/generate', authMiddleware, async (req, res) => {
    let { prompt, style } = req.body;

    if (!prompt) return res.status(400).send("Prompt is required");

    // Default style if not provided
    if (!style) {
        style = "a short, rhyming poem";
    }

    // Enhance the prompt based on the style
    const enhancedPrompt = `Write ${style} about ${prompt}. Make it lyrical, expressive, and creative.`;

    try {
        // Send the enhanced prompt to Google Generative AI (Gemini API)
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

        // Extract generated text and handle any errors
        const poem = response.data.candidates[0]?.content?.parts[0]?.text?.trim() || "No poem generated";
        res.send(poem);  // Send only the poem text without JSON

    } catch (error) {
        console.error("Error generating poem:", error.response?.data || error.message);
        res.status(500).send("Failed to generate poem");
    }
});

module.exports = router;
