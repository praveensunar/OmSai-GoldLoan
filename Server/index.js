const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const AdminModule = require('./models/Admin');
const GoldloancustomerModel = require('./models/Customer');
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];

    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost for development (any port)
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }

    // Allow any Netlify preview URL
    if (origin.includes('netlify.app')) {
      return callback(null, true);
    }

    // Allow any Render URL
    if (origin.includes('onrender.com')) {
      return callback(null, true);
    }

    console.log('❌ CORS blocked origin:', origin);
    console.log('📋 Allowed origins:', allowedOrigins);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Database Connection
const mongoUri = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI
  : process.env.MONGODB_LOCAL_URI || process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log(`✅ Connected to MongoDB: ${process.env.NODE_ENV === 'production' ? 'Atlas' : 'Local'}`);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey@123");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
app.post('/register',(req,res)=>{
    AdminModule.create(req.body)
    .then(Admin=>res.json(Admin))
    .catch(err=>res.status(400).json(err));
})
// Verify token endpoint
app.post('/verify-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided", valid: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey@123");
        res.json({
            message: "Token is valid",
            valid: true,
            user: {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name
            }
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token", valid: false });
    }
});

app.post('/addcustomer', verifyToken, (req,res)=>{
    GoldloancustomerModel.create(req.body)
    .then(GoldloanCustomers=>res.json(GoldloanCustomers))
    .catch(err=>res.status(400).json(err));
})

// Root route for health check
app.get('/', (req, res) => {
    res.json({
        message: "🎉 ✨ Om Sai Gold Loan API Server is running successfully! 🚀",
        status: "active",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            login: "POST /",
            customers: "GET /customerdetail",
            addCustomer: "POST /addcustomer",
            updateCustomer: "PUT /updatecustomer/:id",
            deleteCustomer: "DELETE /customer/:id",
            verifyToken: "GET /verify-token"
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

// Debug endpoint to check collections
app.get('/debug/collections', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionInfo = [];

        for (const collection of collections) {
            const count = await mongoose.connection.db.collection(collection.name).countDocuments();
            const sampleDoc = await mongoose.connection.db.collection(collection.name).findOne();
            collectionInfo.push({
                name: collection.name,
                count: count,
                sampleFields: sampleDoc ? Object.keys(sampleDoc) : []
            });
        }

        res.json({
            totalCollections: collections.length,
            collections: collectionInfo,
            currentModel: {
                name: 'GoldloancustomerModel',
                collection: GoldloancustomerModel.collection.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/',(req,res)=>{
    try{
        const {email,password} = req.body;
        AdminModule.findOne({email:email})
        .then(user =>{
            if(user){
                if(user.password === password){
                    // Generate JWT token with configurable expiration
                    const token = jwt.sign(
                        {
                            id: user._id,
                            email: user.email,
                            name: user.name
                        },
                        process.env.JWT_SECRET || "secretkey@123",
                        {expiresIn: process.env.JWT_EXPIRES_IN || '30m'}
                    );

                    res.json({
                        message: "success",
                        token: token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }else{
                    res.json({message: "Incorrect Password"});
                }
            }else{
                res.json({message: "User not found"});
            }
        })
        .catch(error => {
            console.error("Database error:", error);
            res.status(500).json({message: "Server error"});
        });
    }
    catch(error){
        console.error("Login error:", error);
        res.status(500).json({message: "Server error"});
    }
})
// app.get('/getusers',(req,res)=>{
//     AdminModule.find(req.body)
//     .then(Admin=>res.json(Admin))
//     .catch(err=>res.status(400).json(err));
// })


app.get('/customerdetail', verifyToken, async (req,res)=>{
    try {
        console.log('📋 Fetching customer details...');
        console.log('🔍 Collection name:', GoldloancustomerModel.collection.name);

        // Check all collections in database
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Available collections:', collections.map(c => c.name));

        const customers = await GoldloancustomerModel.find({});
        console.log(`✅ Found ${customers.length} customers in ${GoldloancustomerModel.collection.name}`);

        // If no customers found, try to find in other collections
        if (customers.length === 0) {
            console.log('🔍 Checking for data in other collections...');
            for (const collection of collections) {
                if (collection.name.toLowerCase().includes('customer') || collection.name.toLowerCase().includes('goldloan')) {
                    const count = await mongoose.connection.db.collection(collection.name).countDocuments();
                    console.log(`📋 Collection "${collection.name}" has ${count} documents`);
                }
            }
        }

        res.json(customers);
    } catch (err) {
        console.error('❌ Error fetching customers:', err);
        res.status(500).json({message: "Error fetching customers: " + err.message});
    }
})

app.get('/customer/:id', verifyToken, async (req, res) => {
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

app.put('/updatecustomer/:id', verifyToken, async (req, res) => {
    try {
        const updatedCustomer = await GoldloancustomerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Error updating customer' });
    }
});

app.delete('/customer/:id', verifyToken, async (req, res) => {
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


const PORT = process.env.PORT || 3001;
const SERVER_NAME = process.env.SERVER_NAME || "Om Sai Gold Loan API Server";

app.listen(PORT, () => {
    console.log(`🎉 ✨ ${SERVER_NAME} is running on port ${PORT} 🚀`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Database: ${process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'Local MongoDB'}`);
});


