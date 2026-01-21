const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true }, // remove `unique: true`
    address: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    itemName: { type: String, required: true },
    itemWeight: { type: Number, required: true },
    loanDate: { type: Date, required: true },
    imageUrl: { type: String, default: '' },
    status: { type: String, default: 'Active' }
}, { timestamps: true });
// Try different possible collection names
const GoldloancustomerModel = mongoose.model("Goldloancustomers", CustomerSchema, "goldloancustomers");
module.exports = GoldloancustomerModel