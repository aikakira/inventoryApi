"use strict";

var validation = require('../lib/validation.js');
var Item = require('../model/inventoryModel.js');

exports.get_all_items = function(req, res) {
    Item.getAllItems(function(err, item) {
        if (err) {
            res.send(err);
        } else {
            res.send(item);
        }
    })
}

exports.get_item = function(req, res) {
    var item = req.params;
    Item.getItemById(item.itemId, function(err, item) {
        if (err) {
            res.send(err);
        } else {
            res.send(item);
        }
    })
}

exports.add_new_item = function(req, res) {
    var newItem = new Item(req.body);

    if(!validation.newItem(newItem)) {
        res.status(400).send({
            error: true,
            message: 'Please provide item_title.'
        });
    } else {
        Item.createItem(newItem, function(err, item) {
            if(err) {
                res.send(err);
            } else {
                res.json({
                    id: item.insertId,
                    status: 'Success'
                });
            }
        });
    }
}

exports.update_item = function(req, res) {
    var item = {
        id: req.params.itemId,
        data: req.body
    };

    console.log(item);

    if(!validation.updateItem(item)) {
        res.status(400).send({
            error: true,
            message: 'id or manual_count has not been specificed.'
        });
    }

    Item.checkId(item.id, function(err, result) {
        if(result.length > 0) {
            Item.updateManualCount(item, function(err, result) {
                if(err) {
                    res.send(err);
                } else {
                    res.json({
                        id: item.id,
                        status: 'Successfully updated'
                    });
                }
            });

            Item.matchStock(item.id, function(err, result) {
                if(err) {
                    res.send(err);
                }
            });
        } else {
            res.status(400).send({
                error: true,
                message: 'id does not exist'
            });
        }
    });
}
