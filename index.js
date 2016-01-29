'use strict';

var _ = require('lodash');

module.exports = function pickByJsonSchema(dataSchema, data) {
    switch (dataSchema.type) {
        case 'array':
            if (!dataSchema.items.additionalProperties) {
                var value = _(data).map(function (entry) {
                    return _.pick(entry, _.keys(dataSchema.items.properties));
                }).value();
                return value;
            }
            break;
        case 'object':
            if (!dataSchema.additionalProperties) {
                return _.pick(data, _.keys(dataSchema.properties));
            }
            break;
    }
    return _.cloneDeep(data);
};
