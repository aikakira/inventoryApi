"use strict";

var sql = require('../lib/db.js');

var Item = function(item) {
    this.item_title = item.item_title;
    this.current_count = item.current_count;
    this.manual_count = item.manual_count;
}

Item.getAllItems = function getAllItems(result) {
    sql.query("SELECT * FROM inventory", function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Inventory : ', res);  
            result(null, res);
        }
    });
}

Item.getItemById = function getItemById(item, result) {
    console.log(item);
    sql.query("SELECT * FROM inventory WHERE id = ?", item, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Item.createItem = function createItem(item, result) {
    sql.query("INSERT INTO inventory SET ?", item, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Item.updateManualCount = function updateManualCount(item, result) {
    sql.query("UPDATE inventory SET manual_count = ? WHERE inventory.id = ?", [item.data.manual_count, item.id], function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Item.checkId = function checkId(id, result) {
    sql.query("SELECT DISTINCT 1 result FROM inventory WHERE id = ?", id, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }    
    })
}


Item.matchStock = function matchStock(id, result) {
    sql.query("SELECT manual_count FROM inventory WHERE id = ? LIMIT 1", id, function(err, res) {
        if(res[0].manual_count) {
            var count = res[0].manual_count;
            sql.query("UPDATE inventory SET current_count = ? WHERE inventory.id = ?", [count, id], function(err) {
                if(err) {
                    console.log("error: ", err);
                    return false;
                }
            });
        }
    });
}

module.exports = Item;
