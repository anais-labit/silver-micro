const { roles } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    id_owner: {
      type: "integer",
    },
  },
  required: ["name", "id_owner"],
  additionalProperties: false,
};
