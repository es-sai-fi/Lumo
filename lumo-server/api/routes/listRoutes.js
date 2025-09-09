const express = require("express");
const router = express.Router();
const ListController = require("../controllers/ListController");

router.post("/", ListController.create);
router.get("/:userId", ListController.getAll);
router.get("/list_tasks/:listId", ListController.getListTasks);

module.exports = router;
