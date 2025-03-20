const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AdminModule =require('./models/Admin');
const GoldloancustomerModel = require('./models/Customer');
 
const app = express();
app.use(express.json())
app.use(cors());
 const url = `mongodb+srv://user2000:praveen123@cluster0.usl4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// const url = "mongodb://localhost:27017/goldloan"
mongoose.connect(url);
app.post('/register',(req,res)=>{
    AdminModule.create(req.body)
    .then(Admin=>res.json(Admin))
    .catch(err=>res.status(400).json(err));
})


app.post('/addcustomer',(req,res)=>{
    GoldloancustomerModel.create(req.body)
    .then(GoldloanCustomers=>res.json(GoldloanCustomers))
    .catch(err=>res.status(400).json(err));
})


app.post('/',(req,res)=>{
    const {email,password} = req.body;
    AdminModule.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json({message: "success"})
            }else{
                res.json({message: "Incorrect Password"})
                
            }
        }else{
            res.json({message: "User not found"})
        }
    })
})
// app.get('/getusers',(req,res)=>{
//     AdminModule.find(req.body)
//     .then(Admin=>res.json(Admin))
//     .catch(err=>res.status(400).json(err));
// })


app.get('/customerdetail',(req,res)=>{
    GoldloancustomerModel.find(req.body)
   .then(GoldloanCustomers=>res.json(GoldloanCustomers))
   .catch(err=>res.json(err));
})

app.get('/customer/:id', async (req, res) => {
    try {
        const customer = await GoldloancustomerModel.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.put('/updatecustomer/:id', async (req, res) => {
    try {
        const updatedCustomer = await GoldloancustomerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Error updating customer' });
    }
});

app.delete('/customer/:id', async (req, res) => {
    try {
        const deletedCustomer = await GoldloancustomerModel.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Failed to delete customer" });
    }
});


app.listen(3001,() => {
    console.log("🎉 ✨ Server is running on port 3001 🚀");
});


