
module.exports = (sequelize, type) => sequelize.define('tour_guide', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    nationality:  {
      type: type.STRING,
      allowNull: false,
    },
    national_id: {
      type: type.INTEGER,
      allowNull: false,
    },
    passpot_number: {
      type: type.INTEGER,
      allowNull: true,
    },
    licence_number: {
      type: type.INTEGER,
      allowNull: false,
    },
    fees: {
      type: type.FLOAT,
      allowNull: false,
    },
    phone: {
      type: type.INTEGER,
      allowNull: false
    },
    city_id: {
      type: type.INTEGER,
    }
  }, 
  { sequelize, modelName: 'city' },
  { sequelize, modelName: 'language' },
  { sequelize, modelName: 'user_language' },
  );