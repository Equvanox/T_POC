const express = require('express');
const router = express.Router();

const sampleData = [
  {
    "category": "Advertiser A",
    "value": 1500.0
  },
  {
    "category": "Advertiser B",
    "value": 600.0
  },
  {
    "category": "Advertiser C",
    "value": 1200.0
  },
  {
    "category": "Advertiser D",
    "value": 400.0
  },
  {
    "category": "Advertiser E",
    "value": 900.0
  },
  {
    "category": "Advertiser F",
    "value": 750.0
  },
  {
    "category": "Advertiser G",
    "value": 1300.0
  },
  {
    "category": "Advertiser H",
    "value": 800.0
  },
  {
    "category": "Advertiser I",
    "value": 1100.0
  },
  {
    "category": "Advertiser J",
    "value": 500.0
  }
]
;

router.get('/api/dashboard-data', (req, res) => {
    console.log("Reached Data");
    res.json(sampleData);
});

module.exports = router;
