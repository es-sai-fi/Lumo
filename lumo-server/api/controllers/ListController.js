const GlobalController = require("./GlobalController");
const ListDAO = require("../dao/ListDAO");
const TaskDAO = require("../dao/TaskDAO");

class ListController extends GlobalController {
  // Create a new list
  async create(req, res) {
    const { title, user } = req.body;

    if (!title || !user) {
      return res.status(400).json({
        message: "Title and user are required.",
      });
    }

    try {
      const exists = await ListDAO.findOne({ title, user });

      if (exists) {
        return res.status(409).json({
          message: "List name already exists for this user.",
        });
      }

      const list = await ListDAO.create({ title, user });

      res.status(201).json(list);
    } catch (error) {
      console.error("Error creating list:", error);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }

  async getUserLists(req, res) {
    const user = req.params.userId;

    if (!user) {
      return res.status(400).json({ message: "User is required." });
    }
    try {
      console.log(user);
      const lists = await ListDAO.getAll({ user });
      console.log(lists);

      res.status(200).json(lists);
    } catch (error) {
      console.error("Error getting lists:", error);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }

  async getListTasks(req, res) {
    const listId = req.params.listId;

    if (!listId) {
      return res.status(400).json({ message: "listId is required." });
    }

    try {
      const tasks = await TaskDAO.getAll({ list: listId });
      res.status(200).json(tasks);
    } catch (err) {
      console.error("Error getting tasks:", err);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }
}

module.exports = new ListController();
