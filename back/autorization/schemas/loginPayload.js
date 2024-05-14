module.exports = {
  type: "object",
  properties: {
    email: {
      type: "string",
      // pattern: "^[^\s@]+@[^\s@]+\.[^\s@]+$",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
