const express = require('express');
const router = express.Router();
const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Email validation (Basic regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Phone validation (Basic 10-digit validation)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // Check if email already exists
        const existingEmail = await Users.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: `User with ${email} already exists!` });
        }

        // Check if phone already exists
        const existingPhone = await Users.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({ message: `User with ${phone} already exists!` });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Validate role
        const validRoles = ['USER', 'ADMIN'];
        const assignedRole = validRoles.includes(role) ? role : 'USER';

        // Create new user
        const newUser = new Users({
            name,
            email,
            phone,
            role: assignedRole,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json(newUser);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Find user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid Email" });
        }

        // Check password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        // Generate JWT token
        const secretKey = '183876648211723628237618391098';
        const token = jwt.sign({ email: email, role: user.role, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) }, secretKey);
        return res.status(200).json({ message: "Login successful", token: token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
