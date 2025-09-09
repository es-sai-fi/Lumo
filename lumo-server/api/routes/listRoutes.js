const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');

/**
 * @route POST /lists
 * @description Create a new list
 * @access Public
 */
router.post("/", (req, res) => new ListController().createList(req, res));

/**
 * @route GET /lists
 * @description Get all lists for a user
 * @access Public
 */
router.get("/", (req, res) => new ListController().getListsByUser(req, res));

module.exports = router;