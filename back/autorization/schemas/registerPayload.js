const { roles } = require("../../config");

module.exports = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      type: "string",
      pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
      enum: Object.values(roles),
    },
  },
  required: ["email", "firstName", "lastName", "password"],
  additionalProperties: true,
};
