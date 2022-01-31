const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Founder = sequelize.define('founder', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5,100]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['CEO','COO','CMO','CFO','CIO','CTO','CTO']
    }
});

module.exports = Founder