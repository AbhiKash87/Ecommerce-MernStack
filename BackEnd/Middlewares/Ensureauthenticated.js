const passport = require('passport');
const PassportJWTConfig = require('./PassportJWTConfig')

const ensureAuthenticated = (req, res, next)=> {

    
    return passport.authenticate('jwt',{session:false})

}

module.exports = ensureAuthenticated;