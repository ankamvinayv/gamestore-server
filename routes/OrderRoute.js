const express = require('express');
const router = express.Router();
const Orders = require('../models/OrderModel');


// Method: GET || API: /orders/all
router.get('/all', async (req, res) => {
    try {
        const orders = await Orders.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: GET || API: /orders/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: POST || API: /orders/add
router.post('/add', async (req, res) => {
    try {
        const { uid, gid, totalPrice, phone } = req.body;

        if (!uid || !gid || !totalPrice) {
            return res.status(400).json({ message: "UID, GID, and Total Price are required" });
        }

        const newOrder = new Orders({
            uid,
            gid,
            totalPrice,
            phone,
        });

        const savedOrder = await newOrder.save();
        return res.status(201).json(savedOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Method: PUT || API: /orders/edit/:id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existingOrder = await Orders.findById(id);

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        const updatedOrder = await Orders.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


// Method: DELETE || API: /orders/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existingOrder = await Orders.findById(id);

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        await Orders.findByIdAndDelete(id);
        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
