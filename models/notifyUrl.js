const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the schema for the NotifyUrl collection
const notifyUrlSchema = new Schema({
  body: Map,
  query: Map,
});

// Create a model for the NotifyUrl collection
const NotifyUrl = mongoose.model("NotifyUrl", notifyUrlSchema);

module.exports = NotifyUrl;
