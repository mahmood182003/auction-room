/**
 * this contains:
 * -business logic for "item" model.
 * -endpoints for "item" REST routes.
 *
 */
var itemApi = {};
var userBids = {}; // remember which bid on which item
var itemModel = require("../models/item");
const bidIncrease = 10;

/**
 * handles concurrent bidding.
 * it relies on the in-memory state variables, must be handled differently in clustered env.
 * @param params
 * @param callback
 */
itemApi.doBid = function doBid(params, callback) {
    var
        newBid;
    console.log('dobid: ', params);
    itemModel.get(params.itemId, function (err, myItem) {
        if (myItem) {
            newBid = {userId: params.userId, value: myItem.startPrice + bidIncrease};
            if (userBids[params.itemId] && userBids[params.itemId].userId !== params.userId) {
                callback(null, {status: "OUTBID", currentBid: userBids[params.itemId].value, bidHolder: userBids[params.itemId].userId});

            } else {
                userBids[params.itemId] = newBid;
                callback(null, {status: "OK", currentBid: newBid.value});
            }
        } else {
            callback(1004);
        }
    });
};

/**
 * forget about the first bid and reset state.
 * @param params
 * @param callback
 */
itemApi.resetBid = function doBid(params, callback) {
    if (userBids[params.itemId] && userBids[params.itemId].userId === params.userId) {
        delete userBids[params.itemId];
        callback();
    } else {
        callback(403);
    }
};

module.exports = itemApi;