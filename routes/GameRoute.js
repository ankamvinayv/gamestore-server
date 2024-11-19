const express = require('express');
const router = express.Router();
const Games = require('../models/GameModel');
//const validate = require('../configs/auth')


// Method : GET  || API : localhost:5000/games/all
router.get('/all', async (req, res) => {
    try {
        const games = await Games.find()
        return res.status(200).json(games)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// Method : POST  || API : localhost:5000/games/addgame
router.post('/addgame', async (req, res) =>{
    try {
      const GameData = new Games(req.body)
      const {title, desc, price,category, releaseDate ,imgUrl, } = GameData
      if(!title || !desc || !price || !category || !releaseDate|| !imgUrl  ){
             return res.status(400).json({message:"All fields are required"})
      }
    const storedata = await GameData.save()
    return res.status(200).json(storedata);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const existinggame = await Games.findOne({ _id: id })
        if (!existinggame) {
            res.status(404).json({ message: "Game not found" })
        }
        const updatedgame = await Games.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedgame)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const existinggame = await Games.findOne({ _id: id })
        if (!existinggame) {
            res.status(404).json({ message: "Product not found" })
        }
        await Games.findByIdAndDelete(id)
        res.status(200).json({ message: "Game Deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





module.exports = router;