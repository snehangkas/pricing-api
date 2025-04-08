const STATIC_PRICE = 99.99;

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { productId } = req.query;
        
        res.status(200).json({
            productId,
            price: STATIC_PRICE.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
} 