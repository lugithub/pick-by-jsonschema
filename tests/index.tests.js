'use strict';

var expect = require('chai').expect;
var pickByJsonSchema = require('../index');

var dataArraySchema = {
    type: 'array',
    additionalProperties: false,
    items: {
        type: 'object',
        additionalProperties: false,
        properties: {
            id: {
                type: 'string',
                format: 'guid'
            }
        },
        required: [
            'id'
        ]
    }
};

var additionalPropertiesdataArraySchema = {
    type: 'array',
    additionalProperties: false,
    items: {
        type: 'object',
        additionalProperties: true,
        properties: {
            id: {
                type: 'string',
                format: 'guid'
            }
        },
        required: [
            'id'
        ]
    }
};

var dataSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'string',
            format: 'guid'
        }
    },
    required: [
        'id'
    ]
};

var additionalPropertiesdataSchema = {
    type: 'object',
    additionalProperties: true,
    properties: {
        id: {
            type: 'string',
            format: 'guid'
        }
    },
    required: [
        'id'
    ]
};

var addressSchema = {
    "id": "/SimpleAddress",
    "type": "object",
    "properties": {
        "lines": {
            "type": "array",
            "items": {"type": "string"}
        },
        "zip": {"type": "string"},
        "city": {"type": "string"},
        "country": {"type": "string"}
    },
    "required": ["country"]
};

var personSchema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "address": {"$ref": "/SimpleAddress"},
        "votes": {"type": "integer", "minimum": 1}
    }
};

var dataArray = [{id: '123', name: 'myname'}];
var data = {id: '123', name: 'myname'};

describe('pickByJsonSchema', function() {
    it('should remove extra properties from an item in array', function() {
        var pick = pickByJsonSchema(dataArraySchema, dataArray);
        expect(pick).to.deep.equal([{id: '123'}]);
    });
    it('should not remove extra properties from an item in array if additionalProperties is true', function() {
        var pick = pickByJsonSchema(additionalPropertiesdataArraySchema, dataArray);
        expect(pick).to.deep.equal([{id: '123', name: 'myname'}]);
    });
    it('should remove extra properties from an object', function() {
        var pick = pickByJsonSchema(dataSchema, data);
        expect(pick).to.deep.equal({id: '123'});
    });
    it('should not remove extra properties from an object if additionalProperties is true', function() {
        var pick = pickByJsonSchema(additionalPropertiesdataSchema, data);
        expect(pick).to.deep.equal({id: '123', name: 'myname'});
    });
});
