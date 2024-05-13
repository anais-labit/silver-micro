const { roles } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    pax_capacity: {
      type: "integer",
    },
    address: {
      type: "string",
    },
    description: {
      type: "string",
    },
    menu: {
      type: "object",
    },
    rate: {
      type: "number",
    },
    id_owner: {
      type: "integer",
    },
  },
  required: ["name", "id_owner"],
  additionalProperties: true,
};