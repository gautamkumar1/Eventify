const { DataTypes } = require('sequelize');
const sequelize = require('../database/Db');
const Ticket = require('./Ticket');

const Booking = sequelize.define('Booking', {
    ticketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ticket,
            key: 'id',
        },
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    event: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ticketType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Booking.belongsTo(Ticket, { foreignKey: 'ticketId' });

module.exports = Booking;

