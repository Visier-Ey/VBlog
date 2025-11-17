const db = require('../db/index.js');
const sourceBaseUrl = require('../config/index.js').serverBaseUrl;

const fs = require('fs');


exports.getLayouts = async (req, res) => {
    try {
        const layouts = fs.readFileSync('Json/postcard_layouts.json', 'utf-8');
        const parsedLayouts = JSON.parse(layouts);
        const result = parsedLayouts;
        res.json(result);
    } catch (err) {
        console.error('Error fetching postcard layouts:', err);
        res.status(500).json({ error: 'Failed to fetch postcard layouts' });
    }
}
