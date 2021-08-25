const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamID: { type: String, require: true, unique: true},
    members: { type: Array, require: true},
    coins: { type: Number, default: 100},
    invaders: { type: Number, default: 0},
    position: { type: Number, default: 0}
})

const model = mongoose.model('TeamModels', teamSchema);

module.exports = model;