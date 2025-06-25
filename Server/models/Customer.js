const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: String,
    mobile:{
        type: 'String',
        unique:true,
    },
    address: String,
    loanDate: String,
    loanAmount: String,
    interestRate: String,
    itemName: String,
    itemWeight: String,
    status: String,
    imageUrl: String,
},{timestamps:true})
// Try different possible collection names
const GoldloancustomerModel = mongoose.model("Goldloancustomers", CustomerSchema, "goldloancustomers");
module.exports = GoldloancustomerModel