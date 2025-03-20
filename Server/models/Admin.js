const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    phone: String
})
const AdminModule = mongoose.model("Admin",AdminSchema)
module.exports = AdminModule