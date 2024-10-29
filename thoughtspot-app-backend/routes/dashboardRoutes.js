const express = require('express');
const router = express.Router();

const sampleData = [
  { category: 'Jan', value: 120 },
  { category: 'Feb', value: 200 },
  { category: 'Mar', value: 150 },
  { category: 'Apr', value: 80 },
];

router.get('/api/dashboard-data', (req, res) => {
    console.log("Reached Data");
    res.json(sampleData);
});

module.exports = router;
