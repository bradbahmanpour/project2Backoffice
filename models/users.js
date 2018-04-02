var express = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    // Creates a "Character" model that matches up with DB
    var users = sequelize.define("users", {
            // the name of the character (a string)
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            timestamps: false
        }, {
            indexes: [{
                unique: true,
                fields: ['username']
            }]
        }
    );
    return users;
};