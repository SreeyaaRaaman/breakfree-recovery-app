const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const DailyLog = require('../models/DailyLog');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const logs = await DailyLog.findAll({ 
            where: { userId: req.user.id },
            order: [['date', 'ASC']]
        });

        const daysCompleted = Math.floor((new Date() - new Date(user.startDate)) / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.max(0, user.goalDuration - daysCompleted);

        // Calculate current streak
        let streak = logs.length; // Basic implementation: logs count

        res.json({
            daysCompleted,
            daysRemaining,
            streak,
            totalSaved: user.totalSaved,
            logs
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
