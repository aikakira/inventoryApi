"use strict";

module.exports = function(app) {
    var inventory = require('../controller/inventoryController.js');

    app.route('/inventory')
        .get(inventory.get_all_items)
        .post(inventory.add_new_item);

    app.route('/inventory/:itemId')
        .get(inventory.get_item)
        .put(inventory.update_item);
        //.delete(inventory.delete_item);
};
