const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {
    getSumamry, 
    getMonthlyTrend,
    getRecentRecords, 
    getCategoryData
} = require("../controllers/dashboardController");

router.get("/summary", protect, getSumamry);
router.get("/category", protect, getCategoryData);
router.get("/trend", protect, getMonthlyTrend);
router.get("/recent", protect, getRecentRecords);

module.exports = router;