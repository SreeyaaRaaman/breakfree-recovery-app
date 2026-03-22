const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    addictionType: { type: DataTypes.STRING, allowNull: false },
    goalDuration: { type: DataTypes.INTEGER, allowNull: false },
    startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    goalEndDate: { type: DataTypes.DATE, allowNull: false },
    totalSaved: { type: DataTypes.FLOAT, defaultValue: 0 },
    lockedAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    withdrawable: { type: DataTypes.BOOLEAN, defaultValue: false },
    razorpayCustomerId: { type: DataTypes.STRING, allowNull: true }
});

module.exports = User;
