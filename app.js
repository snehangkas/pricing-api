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

// Static price for all products
const STATIC_PRICE = 99.99;

// GET endpoint for product pricing
app.get('/api/products/:productId/price', (req, res) => {
    try {
        const { productId } = req.params;
        
        // Return the static price for any product ID
        res.json({
            productId,
            price: STATIC_PRICE.toFixed(2)
        });
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