const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
// This means we are trying to pull a model OUT of mongoose
// This model has been previously pushed into mongoose via User.js
const User = mongoose.model('users');

passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // Find a record where the google id = profile id
        User.findOne({ googleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
                // we already have a record
                done(null,existingUser);
            } else {
                // Creates a new model instance
                new User({ googleId: profile.id })
                .save()
                .then(user => {
                    // Always take the user that is recieved from the DB
                    done(null,user);
                });
            }
        });
    })
);