const STATIC_PRICE = 99.99;

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get productId from the URL path parameter
        const productId = req.url.split('/').slice(-2)[0];
        
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