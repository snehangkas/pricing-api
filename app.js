const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
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