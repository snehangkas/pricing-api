// Function to generate random B2B customer data
const generateRandomB2BData = (userId) => {
    const companyNames = ['TechCorp', 'Global Industries', 'Innovate Solutions', 'Future Enterprises', 'Digital Dynamics'];
    const roles = ['Buyer', 'Procurement Manager', 'Finance Approver', 'Supply Chain Manager', 'Operations Director'];
    const paymentMethods = ['Invoice', 'Credit Card', 'Net Terms'];
    const addresses = [
        '123 Business Park, Suite 100, New York, NY 10001',
        '456 Corporate Drive, Building A, Chicago, IL 60601',
        '789 Innovation Way, Floor 5, San Francisco, CA 94105'
    ];

    // Use userId to seed the random number generator for consistent results per user
    const seed = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seededRandom = (max) => {
        const x = Math.sin(seed + max) * 10000;
        return Math.floor((x - Math.floor(x)) * max);
    };

    return {
        userId,
        companyName: companyNames[seededRandom(companyNames.length)],
        companyRegistrationNumber: `REG${seededRandom(1000000).toString().padStart(6, '0')}`,
        userRole: roles[seededRandom(roles.length)],
        defaultShippingAddress: addresses[seededRandom(addresses.length)],
        defaultBillingAddress: addresses[seededRandom(addresses.length)],
        preferredPaymentMethod: paymentMethods[seededRandom(paymentMethods.length)],
        creditLimit: seededRandom(100000) + 50000,
        purchaseOrderRequired: seededRandom(2) === 1
    };
};

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
        // Get userId from the URL path parameter
        const userId = req.url.split('/').slice(-1)[0];
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        res.status(200).json(generateRandomB2BData(userId));
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
} 