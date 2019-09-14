const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const Admin = require("../sequelize").Admin

router.post("/", async (req, res, next) => {
  console.log("register");
  passport.authenticate("register", async (err, admin, message) => {
    if (err) {
      console.error(err);
    }
    // if (message) {
    //   console.log("object",message)
    //   return res.status(403).send(message);
    // }
    const {email} = req.body
    req.logIn(admin,async ()=>{
      try {
        await Admin.update(
          {
            email
          },
          {
            where: {email}
          }
          );
          res.status(200).send({message: "admin created"});
        } catch (error) {
          res.send(error)
        }
      })
  })(req, res, next);
});

module.exports = router;
