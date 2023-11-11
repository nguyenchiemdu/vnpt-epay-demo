const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the schema for the transaction collection
const transactionSchema = new Schema({
    userId: String,
    amount: Number,
    goodsNm: String,
    currency: String,
    payType: String,
    bankCode: String,
    payOption: String,
});

// Create a model for the transaction collection
const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
