const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");
const jwtSecret = require("../config/jwtConf");
const Admin = require("../sequelize").Admin;

router.post("/", async (req, res, next) => {
  passport.authenticate("login", async (err, admin, message) => {
    if (err) {
      console.error(err);
    }
    // if (message) {
    //   return res.status(403).send(message);
    // }
    const {email} = req.body;
    req.logIn(admin, async () => {
      try {
        const admin = await Admin.findOne({where: {email}});
        const isAdmin = (await Admin.findOne({where: {adminId: admin.id}})) ? true : false;
        console.log(isAdmin);
        const token = jwt.sign(
          {id: admin.id, isAdmin, email},
          jwtSecret.secret
        );
        res.status(200).send({token, auth: true, message: "Logged in successfully"});
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    });
  })(req, res, next);
});

module.exports = router;
