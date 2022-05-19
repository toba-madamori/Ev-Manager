const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../Users/models')

const FindOrCreate = (input)=>{
    return new Promise((resolve, reject)=>{
        const user = User.findOne({ email:input._json.email})
        if(user.provider === input.provider) {
            return resolve(user)
        } else{
            const newUser = User.create({ name:input.givenName, email:input._json.email, provider:input.provider })
            return resolve(newUser)
        }
    })
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
))

// These functions are required for getting data To/from JSON returned from Providers
passport.serializeUser(function(user, done) {
    done(null, user)
})
passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

module.exports = {
    FindOrCreate
}