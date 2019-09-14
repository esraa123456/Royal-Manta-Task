module.exports = (sequelize, type) => sequelize.define('user_language', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    language_id: {
        type: type.INTEGER,
    },
    tour_guide_id:{
        type: type.INTEGER,
    }
  }
);