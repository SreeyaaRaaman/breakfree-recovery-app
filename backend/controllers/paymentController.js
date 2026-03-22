const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const DailyLog = require('../models/DailyLog');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SUAYKWh9S2Xhcl',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '9rzHlxJkOtCJyMubnvtFmsT4',
});

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body; // amount in INR
        const options = {
            amount: amount * 100, // convert to paise
            currency: 'INR',
            receipt: 'receipt_' + Date.now(),
        };

        const order = await instance.orders.create(options);
        res.json({
            id: order.id,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID || 'rzp_test_SUAYKWh9S2Xhcl'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: error.error ? error.error.description : 'Server error creating order' });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature, amount } = req.body;
        
        const text = orderId + "|" + paymentId;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        if (generated_signature === signature) {
            // Valid payment, update DB
            const user = await User.findByPk(req.user.id);
            user.totalSaved += amount;
            user.lockedAmount += amount;
            await user.save();

            await Transaction.create({
                userId: req.user.id,
                amount,
                paymentId,
                status: 'success',
                type: 'deposit'
            });

            await DailyLog.create({
                userId: req.user.id,
                amount
            });

            res.json({ msg: 'Payment verified successfully and logged' });
        } else {
            res.status(400).json({ msg: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).send('Server Error');
    }
};

exports.withdraw = async (req, res) => {
    try {
        const { upiId } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user.withdrawable) {
            return res.status(400).json({ msg: 'Withdrawal not permitted yet. Goal not reached.' });
        }

        if (user.lockedAmount <= 0) {
            return res.status(400).json({ msg: 'No funds to withdraw.' });
        }

        const amountToWithdraw = user.lockedAmount;

        await Transaction.create({
            userId: req.user.id,
            amount: amountToWithdraw,
            paymentId: 'payout_' + Date.now(),
            status: 'success',
            type: 'withdrawal'
        });

        user.lockedAmount = 0;
        await user.save();

        res.json({ msg: 'Withdrawal successful', amount: amountToWithdraw, upiId });
    } catch (error) {
        console.error('Error processing withdrawal:', error);
        res.status(500).send('Server Error');
    }
};
