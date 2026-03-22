const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQLite Database Connected...');
        
        // Ensure models are registered and tables are created
        require('../models/User');
        require('../models/Transaction');
        require('../models/DailyLog');
        await sequelize.sync({ alter: true });
        console.log('SQLite tables synced.');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
