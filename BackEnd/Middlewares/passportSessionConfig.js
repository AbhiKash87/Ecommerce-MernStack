const passport = require('passport');
const { User } = require('../Model/User');
const SanitizedUser = require('./SanitizedUser');
const LocalStrategy = require('passport-local').Strategy;

passport.use( new LocalStrategy( async (username, password, done)=>{


    try {
    
        const user = await User.findOne({email:username});
    
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const isValid = await user.validatePassword(password);
        if (!isValid) {
            console.log(isValid)
            return done(null, false, { message: 'Incorrect password.' });
        }
        
        return done(null, user);

    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, {_id:user.id,email:user.email,name:user.name,role:user.role,addresses:user.addresses,orders:user.orders} );
});

// Deserialize user to retrieve from session
passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser");
    console.log(id);
    
    try {
        let user = await User.findById(id);
        user = SanitizedUser(user)
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;

  