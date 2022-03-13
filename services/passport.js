const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
// This means we are trying to pull a model OUT of mongoose
// This model has been previously pushed into mongoose via User.js
const User = mongoose.model('users');
// user is what comes from the DB, we use it to create a cookie
passport.serializeUser((user, done) => {
    //first arguement of done is error handling func but we dont expect it to fail
    // We use the unique id that mongoDB auto generates for each record 
    done(null, user.id);
});
// Turn an id into MongoDB model instance
passport.deserializeUser((id, done) => {
    // Remember mongoose functions are async, ASSUME IT IS A PROMISE!
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // Find a record where the google id = profile id
        User.findOne({ googleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
                // we already have a record
                done(null, existingUser);
            } else {
                // Creates a new model instance
                new User({ googleId: profile.id })
                .save()
                // Always take the user that is recieved from the DB
                .then(user => done(null,user))
            }
        });
    })
);