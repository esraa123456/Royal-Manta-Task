const Sequelize = require('sequelize');
const TourGuideModel = require( './models/tour_guide')
const AdminModel = require( './models/admin')
const CityModel = require( './models/city')
const LanguageModel = require( './models/language')
const UserLanguageModel = require( './models/user_language')

const sequelize = new Sequelize('travel', process.env.SQL_USER_NAME, process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect:'postgresql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
 
const TourGuide = TourGuideModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);
const City = CityModel(sequelize, Sequelize);
const Language = LanguageModel(sequelize, Sequelize);
const UserLanguage = UserLanguageModel(sequelize, Sequelize);

City.belongsTo(TourGuide)
Language.belongsTo(UserLanguage)
TourGuide.belongsTo(UserLanguage)

sequelize.sync().then(() => {
    console.log('tables created');
}); 


module.exports = {TourGuide,Admin,City,Language,UserLanguage};
