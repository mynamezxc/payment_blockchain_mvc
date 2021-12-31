const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
    name: String,
    tax_id: String,
    email: String,
    wallet: String,
    signature: String,
    subscription: Boolean
});

module.exports = mongoose.model("Company", CompanySchema);