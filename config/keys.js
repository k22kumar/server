// determines which credentials to return
// this variable tells us if we are in production or not which is set up by heroku
if (process.env.NODE_ENV === 'production') {
    // use prod keys
    module.exports = require('./prod');
} else {
    // use dev keys
    module.exports = require('./dev');
}