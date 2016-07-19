/**
 *
 * singleton model object for encapsulating basic DB operations.
 */

var myModel = {};
var itemDB = {"item1": {name: 'Item1', description: 'My old laptop!', startPrice: 50}};

myModel.get = function get(id, callback) {
    callback(null, itemDB[id]);
};

module.exports = myModel;