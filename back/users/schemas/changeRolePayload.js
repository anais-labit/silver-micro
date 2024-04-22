const { type, properties, additionalProperties } = require('../../autorization/schemas/loginPayload');
const { roles } = require('../../config');

module.exports = {
    type: "object",
    properties: {
        roles: {
            type: "string",
            enum: Object.values(roles)
        }
    }
    ,
    additionalProperties: false
};