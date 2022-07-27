const passport = require('passport')
const { BadRequestError } = require('../Errors')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../Users/models')

const FindOrCreate = (input)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const user = await User.findOne({ email:input._json.email})
            if(!user) throw new BadRequestError("Invalid Credentials")
            
            if(user.provider === input.provider || user.password) {
                if(user.provider === "Null"){
                    await User.findByIdAndUpdate({_id:user._id}, {provider:input.provider})
                }
                return resolve(user)
            } else{
                const newUser = await User.create({ name:input.givenName, email:input._json.email, provider:input.provider, password:"password", verified:true })
                return resolve(newUser)
            }
        } catch (error) {
            reject(error)
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