var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var quoteSchema   = new Schema({
    text: String,
    author: String,
    local: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    active_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);