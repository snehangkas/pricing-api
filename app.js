const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;



// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json());

// Function to generate random price between 50 and 150
const generateRandomPrice = () => {
    return (Math.random() * 100 + 50).toFixed(2);
};

// GET endpoint for product pricing
app.get('/api/products/:productId/price', (req, res) => {
    try {
        const { productId } = req.params;
        
        // Return a random price for any product ID
        res.json({
            productId,
            price: generateRandomPrice()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Function to generate random B2B customer data
const generateRandomB2BData = () => {
    const companyNames = ['TechCorp', 'Global Industries', 'Innovate Solutions', 'Future Enterprises', 'Digital Dynamics'];
    const roles = ['Buyer', 'Procurement Manager', 'Finance Approver', 'Supply Chain Manager', 'Operations Director'];
    const paymentMethods = ['Invoice', 'Credit Card', 'Net Terms'];
    const addresses = [
        '123 Business Park, Suite 100, New York, NY 10001',
        '456 Corporate Drive, Building A, Chicago, IL 60601',
        '789 Innovation Way, Floor 5, San Francisco, CA 94105'
    ];

    return {
        companyName: companyNames[Math.floor(Math.random() * companyNames.length)],
        companyRegistrationNumber: `REG${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
        userRole: roles[Math.floor(Math.random() * roles.length)],
        defaultShippingAddress: addresses[Math.floor(Math.random() * addresses.length)],
        defaultBillingAddress: addresses[Math.floor(Math.random() * addresses.length)],
        preferredPaymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        creditLimit: Math.floor(Math.random() * 100000) + 50000,
        purchaseOrderRequired: Math.random() > 0.5
    };
};

// GET endpoint for B2B customer data
app.get('/api/b2b/customer', (req, res) => {
    try {
        res.json(generateRandomB2BData());
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 