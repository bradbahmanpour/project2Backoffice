

module.exports = function (sequelize, DataTypes) {
  // Creates a "Character" model that matches up with DB
  var topSpots = sequelize.define("topSpots", {
    // the name of the character (a string)
      spot: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      images: {type: DataTypes.STRING,
      allowNull: false,
      },
      body: {type: DataTypes.TEXT,
      allowNull: false
      },
      zip: {type: DataTypes.INTEGER,
        allowNull: false,
      }
  }, {
    timestamps: false
  });
  return topSpots;
  };
  