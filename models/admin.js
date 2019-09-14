
module.exports = (sequelize, type) => sequelize.define('admin', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }  ,
    email:{
      type: type.STRING,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    resetPasswordToken: type.STRING,
    resetPasswordExpires: type.DATE,
  }
    
);