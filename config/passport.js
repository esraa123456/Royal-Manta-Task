const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const jwtSecret = require("./jwtConf");
const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Admin = require("../sequelize").Admin;

passport.use(
    "register",
    new LocalStrategy(
        {
            session: false,
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const admin = await Admin.findOne({
                    where: {
                        [Op.or]: [{ email }]
                    }
                });
                if (admin) {
                    return done(null, false, { message: "email is already taken" });
                }
                const hashedpassoword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
                const created_admin = await Admin.create({ email, password: hashedpassoword });
                return done(null, created_admin);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            session: false
        },
        async (email, password, done) => {
            try {
                console.log("before admin")
                const admin = await Admin.findOne({ where: { email, } });
                console.log("found", admin)
                if (!admin) {
                    return done(null, false, { message: "credentials are not correct" });
                }

                const isMatched = await bcrypt.compare(password, admin.password);
                if (!isMatched) {
                    return done(null, false, { message: "credentials are not correct" });
                }
                return done(null, admin);
            } catch (error) {
                console.log(error)
                return done(error);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJWT.fromHeader('token'),
    secretOrKey: jwtSecret.secret,
};

passport.use('jwt', new JWTstrategy(opts, async (jwtPayload, done) => {
    console.log(jwtPayload)
    try {
        const admin = await User.findOne({ where: { id: jwtPayload.id } })
        const isAdmin = jwtPayload.isAdmin
        console.log("jwt for admin",jwtPayload.isAdmin)
        if (admin) {
            console.log("admin exist")
            return done(null, { admin, isAdmin })
        }
        return done(null, false,{message:"admin is not exist"})
    } catch (error) {
        done(error)
    }

}))

module.exports = passport;
