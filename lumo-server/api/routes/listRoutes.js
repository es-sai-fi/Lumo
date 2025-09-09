const express = require("express");
const router = express.Router();
const ListController = require("../controllers/ListController");

router.post("/", (req, res) => ListController.create(req, es));
router.get("/:userId", (req, res) => ListController.getUserLists(req, res));
router.get("/list_tasks/:listId", (req, res) =>
  ListController.getListTasks(req, res),
);

module.exports = router;
