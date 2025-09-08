const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');

// POST /api/lists - Create a new list
router.post('/', ListController.createList);

// GET /api/lists?user=USER_ID - Get all lists for a user
router.get('/', ListController.getListsByUser);

module.exports = router;
