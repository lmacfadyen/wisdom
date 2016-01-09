var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var quoteSchema   = new Schema({
    text: String,
    author: String,
    local: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    activeAt: { type: Date, default: Date.now }},
    { collection: 'quote' });

module.exports = mongoose.model('Quote', quoteSchema);