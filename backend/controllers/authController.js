const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password, addictionType, goalDuration } = req.body;
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const startDate = new Date();
        const goalEndDate = new Date();
        goalEndDate.setDate(startDate.getDate() + parseInt(goalDuration));

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            addictionType,
            goalDuration,
            startDate,
            goalEndDate
        });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name, email, addictionType, goalDuration, startDate, goalEndDate } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, email: user.email, addictionType: user.addictionType, goalDuration: user.goalDuration, startDate: user.startDate, goalEndDate: user.goalEndDate } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Update withdrawable status if goal completed
        const currentDate = new Date();
        if (currentDate >= new Date(user.goalEndDate) && !user.withdrawable) {
            user.withdrawable = true;
            await user.save();
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
