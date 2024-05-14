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
      type: "json",
    },
    rate: {
      type: "float",
    },
    id_owner: {
      type: "integer",
    },
  },
  required: ["pax_capacity", "address", "description", "menu"],
  additionalProperties: false,
};