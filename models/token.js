const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
    name: String,
    symbol: String,
    network: String,
    company_id: String,
    address: String,
    owner_address: String,
    init_supply: String,
    total_supply: String,
    decimals: String,
    can_burn: Boolean,
    can_mint: Boolean,
    can_staking: Boolean,
    abi: String,
    created_date: Date
});

module.exports = mongoose.model("Token", TokenSchema);