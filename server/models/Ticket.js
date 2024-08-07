const { DataTypes } = require('sequelize');
const sequelize = require('../database/Db');

const Ticket = sequelize.define('Ticket', {
    eventname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('VIP', 'General'),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    available: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Ticket;
