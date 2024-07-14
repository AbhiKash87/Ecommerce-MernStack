const dotenv = require('dotenv')
const passport = require('passport');
const { User } = require('../Model/User');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

dotenv.config()
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;


async function findUserById(id) {
    
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.error(err);
        return null; // Or handle the error differently
    }
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {


        findUserById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            console.error(err);
            return done(err, false); // Or handle the error differently
        });
 
}));
