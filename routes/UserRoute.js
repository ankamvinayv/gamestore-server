// const express = require('express')
// const router = express.Router();
// const Users = require('../models/UserModel')
// const bcrypt = require('bcrypt')

// // router.get('/count', async (req, res) => {
// //     try {
// //         const count = await Users.countDocuments()
// //         res.status(200).json({count: count})
// //     } catch (error) {
// //         res.status(500).json({ message: error.message })
// //     }
// // })


// router.get('/all', async (req, res) => {
//     try {
//         const users = await Users.find()
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.post('/add', async (req, res) => {
//     try {
        
//         const { name, email, phone, password, role } = req.body
//         if (!name || !email || !phone || !password || !role) {
//             return res.status(400).json({ message: "All fields required" })
//         }

//         //TODO : Add User Email & Phone Validation

//         //Email
//         const exisitingemail = await Users.findOne({ email })
//         if (exisitingemail) {
//             return res.status(409).json({ message: `User with ${email} already exists !` })
//         }

//         //Phone
//         const exisitingphone = await Users.findOne({ phone })
//         if (exisitingphone) {
//             return res.status(409).json({ message: `User with ${phone} already exists !` })
//         }
//         const salt = await bcrypt.genSalt(10)
//         const hashedpassword = await bcrypt.hash(password, salt)
//         const newuser = new Users({
//             name,
//             email,
//             phone,
//             role,
//             password: hashedpassword
//         })
//         await newuser.save()
//         return res.status(200).json(newuser)
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })

// router.put('/edit/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const existinguser = await Users.findOne({ _id: id })
//         if (!existinguser) {
//             res.status(404).json({ message: "User not found" })
//         }
//         const updateduser = await Users.findByIdAndUpdate(id, req.body, { new: true })
//         res.status(200).json(updateduser)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         const existinguser = await Users.findOne({ _id: id })
//         if (!existinguser) {
//             res.status(404).json({ message: "User not found" })
//         }
//         await Users.findByIdAndDelete(id)
//         res.status(200).json({ message: "User Deleted" })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })



// module.exports = router


const express = require('express');
const router = express.Router();
const Users = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Fetch all users
router.get('/all', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await Users.countDocuments()
        res.status(200).json({count: count})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Add user
router.post('/add', async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Phone validation (assuming a simple phone format)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // Check if email already exists
        const existingEmail = await Users.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: `User with email ${email} already exists!` });
        }

        // Check if phone already exists
        const existingPhone = await Users.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({ message: `User with phone ${phone} already exists!` });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new Users({
            name,
            email,
            phone,
            role,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

// Edit user
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // Check if user exists
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user data
        const updatedUser = await Users.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if user exists
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user
        await Users.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
});

module.exports = router;
