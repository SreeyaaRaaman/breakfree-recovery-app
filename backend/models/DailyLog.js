const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DailyLog = sequelize.define('DailyLog', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    mood: { type: DataTypes.STRING, defaultValue: 'Neutral' }
});

module.exports = DailyLog;
