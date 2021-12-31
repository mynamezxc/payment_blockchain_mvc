const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    name: String,
    token_id: String,
    company_id: String,
    network: String,
    from_address: String,
    to_address: String,
    order_id: String,
    status: String, // pending, success, error
    transaction_id: String,
    created_date: Date
});

module.exports = mongoose.model("Order", OrderSchema);