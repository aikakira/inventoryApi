"use strict";

var validate = {
    newItem:  function(item) {
        if(!item.item_title) {
            return false;
        }

        if(!item.current_count) {
            item.current_count = 0; 
        }

        if(!item.manual_count) {
            item.manual_count = 0;
        }

        return item;
    },
    updateItem: function(item) {
        if(!item.id || !item.data.manual_count) {
            return false;
        }
        return true;
    }
};

module.exports = validate;
