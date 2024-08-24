const express = require('express');
const router = express.Router();
const User = require('../../modals/user');

// to get a user with particular role

router.get('/getUsersByRole/:role', async (req, res) => {
    try {
        const role = req.params.role;
        const users = await User.find({ roles: role });
        console.log("data fetched");
        res.status(200).json(users);
    } catch (error) {
        console.log("data cannot fetched");
        res.status(500).json({ message: error.message });
    }
});
router.get('/users', async (req, res) => {
    try {
        // Extract the page number from query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Number of users per page
        
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch users with pagination and filter where isMentor is true
        const users = await User.find({ isMentor: true })
            .skip(skip)
            .limit(limit);

        // Get the total count of users with isMentor true

        const totalUsers = await User.countDocuments({ isMentor: true });

        // Calculate total number of pages
        const totalPages = Math.ceil(totalUsers / limit);

        // Send response with users, current page, and total pages
        res.json({
            products: users,
            current: page,
            pages: totalPages
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message });
    }
});
router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;