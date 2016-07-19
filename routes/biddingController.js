/**
 * this is a basic REST controller.
 *
 * ideally, this should be a single controller that recognizes a specific REST pattern,
 * parses the REST uri, automatically forwards the request to the specified endpoint API,
 * and finally takes care of API callback and response.
 *
 */

var express = require('express');
var router = express.Router();

var itemApi = require('../api/item-api');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET items listing. */
router.get('/items', function (req, res, next) {
    res.render('items', { userId: req.query && req.query.uid });
});

router.post('/dobid', function (req, res, next) {
    itemApi.doBid(req.query, function (err, result) {
        res.render('items', { error: err, data: result, userId: req.query && req.query.userId});
    });
});

router.post('/resetbid', function (req, res, next) {
    itemApi.resetBid(req.query, function (err, result) {
        res.render('items', { error: err, data: result, userId: req.query && req.query.userId});
    });
});

module.exports = router;
