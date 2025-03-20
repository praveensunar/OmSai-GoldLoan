const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    address: String,
    loanDate: String,
    loanAmount: String,
    interestRate: String,
    itemName: String,
    itemWeight: String,
    status: String,
    imageUrl: String,
})
const GoldloancustomerModel = mongoose.model("Goldloancustomers",CustomerSchema)
module.exports = GoldloancustomerModel