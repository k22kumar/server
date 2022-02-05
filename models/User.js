const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});
// will only create if collection does not exist already
// This has been loaded into mongoose
mongoose.model('users', userSchema);