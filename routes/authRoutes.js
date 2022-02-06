const { application } = require('express');
const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'));
    // logout route
    application.get('/api/logout', (req, res) => {
        // kills the cookie
        req.logout();
        // create a res that sends null back
        res.send(req.user);
    });
    // verify user is logged in
    app.get('/api/current_user', (req, res) => {
        res.send((req.user));
    });
};