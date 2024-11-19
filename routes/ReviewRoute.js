const express = require('express');
const router = express.Router();
const Reviews = require('../models/ReviewModel');
const Users = require('../models/UserModel');
const Games = require('../models/GameModel');


// Method: GET || API: /reviews/all
router.get('/all', async (req, res) => {
    try {
        const reviews = await Reviews.find()
            .populate('user', 'name email') // Populate user info
            .populate('game', 'title'); // Populate game info
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: GET || API: /reviews/game/:gameId
router.get('/game/:gameId', async (req, res) => {
    try {
        const { gameId } = req.params;
        const reviews = await Reviews.find({ game: gameId })
            .populate('user', 'name email')
            .populate('game', 'title');
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: POST || API: /reviews/add
router.post('/add', async (req, res) => {
    try {
        const { user, game, rating } = req.body;

        // Validate required fields
        if (!user || !game || !rating) {
            return res.status(400).json({ message: "User, game, and rating are required" });
        }

        // Check if the user and game exist
        const existingUser = await Users.findById(user);
        const existingGame = await Games.findById(game);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!existingGame) {
            return res.status(404).json({ message: "Game not found" });
        }

        const newReview = new Reviews({ user, game, rating });
        const savedReview = await newReview.save();

        return res.status(201).json(savedReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: PUT || API: /reviews/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existingReview = await Reviews.findById(id);

        if (!existingReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        const updatedReview = await Reviews.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: DELETE || API: /reviews/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existingReview = await Reviews.findById(id);

        if (!existingReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        await Reviews.findByIdAndDelete(id);
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
