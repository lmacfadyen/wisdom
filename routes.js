var express = require('express');

// Get the router
var router = express.Router();

var Quote     = require('./models/quote');

// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// Welcome message for a GET at http://localhost:8080/wisdom
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the Wisdom REST API' });   
});

// GET all quotes (using a GET at http://localhost:8080/quotes)
router.route('/quotes')
    .get(function(req, res) {
        Quote.find(function(err, quotes) {
            if (err)
                res.send(err);
            res.json(quotes);
        });
    });

// Create a quote (using POST at http://localhost:8080/quotes)
router.route('/quotes')
    .post(function(req, res) {
        var quote = new Quote();
        // Set values from the request
	quote.text = req.body.text;
	quote.author = req.body.author;

        // Save quote and check for errors
        quote.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Quote created successfully!' });
        });
    });


router.route('/quotes/:quote_id')
    // GET quote with id (using a GET at http://localhost:8080/quotes/:quote_id)
    .get(function(req, res) {
        Quote.findById(req.params.quote_id, function(err, quote) {
            if (err)
                res.send(err);
            res.json(quote);
        });
    })

    // Update quote with id (using a PUT at http://localhost:8080/quotes/:quote_id)
    .put(function(req, res) {
        Quote.findById(req.params.quote_id, function(err, quote) {
            if (err)
                res.send(err);
            // Update the quote text
	    quote.text = req.body.text;
            quote.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Quote successfully updated!' });
            });

        });
    })

    // Delete quote with id (using a DELETE at http://localhost:8080/quotes/:quote_id)
    .delete(function(req, res) {
        Quote.remove({
            _id: req.params.quote_id
        }, function(err, quote) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted quote!' });
        });
    });

module.exports = router;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}