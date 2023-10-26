const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the schema for the CallbackUrl collection
const callbackUrlSchema = new Schema({
  body: Map,
  query: Map,
});

// Create a model for the CallbackUrl collection
const CallbackUrl = mongoose.model("CallbackUrl", callbackUrlSchema);

module.exports = CallbackUrl;
