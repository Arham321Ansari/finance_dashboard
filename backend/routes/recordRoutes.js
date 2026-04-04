const express = require("express");
const router = express.Router();

const {
    createRecord, 
    getRecord, 
    updateRecord, 
    deleteRecord
} = require("../controllers/recordController");

const {protect} = require("../middleware/authMiddleware");
const {authorizeRoles} = require("../middleware/roleMiddleware");

router.post('/', protect, authorizeRoles("admin"), createRecord);
router.patch('/:id', protect, authorizeRoles("admin"), updateRecord);
router.delete('/:id', protect, authorizeRoles("admin"),deleteRecord);

router.get("/", protect, authorizeRoles("analyst", "admin"), getRecord);


module.exports = router;