var express = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    // Creates a "Character" model that matches up with DB
    var classes = sequelize.define("classes", {
        // the name of the character (a string)
        className: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        classDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        classSchedule: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        classPrerequisit: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        classPrice: {
            type: DataTypes.INTEGER
        },
    }, 
    {
        timestamps: false
    }, {
        indexes: [{
            unique: true,
            fields: ['className']
        }]
    });
    return classes;
};