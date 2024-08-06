const { DataTypes } = require('sequelize');
const sequelize = require('../database/Db');
const User = require('./User');
const Ticket = require('./Ticket');

const Booking = sequelize.define('Booking', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ticket,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Ticket, { foreignKey: 'ticketId' });

module.exports = Booking;
