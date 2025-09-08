const GlobalController = require("./GlobalController");
const Task = require("../models/Tasks");
const List = require("../models/List");

/**
 * Controller class for managing Task resources.
 */
class TaskController extends GlobalController {
  constructor() {
    super(ListDAO);
  }

  /**
   * Creates a new task.
   */
  async createTask(req, res) {
    try {
      const { title, description, dueDate, user, list } = req.body;
      if (!title || !user) {
        return res
          .status(400)
          .json({ message: "Title and user are required." });
      }
      let listId = list;
      // Si no se especifica lista, buscar o crear la lista "General Tasks" para el usuario
      if (!listId) {
        let generalList = await List.findOne({ name: "General Tasks", user });
        if (!generalList) {
          generalList = new List({ name: "General Tasks", user });
          await generalList.save();
        }
        listId = generalList._id;
      } else {
        // Validar que la lista exista y pertenezca al usuario
        const foundList = await List.findOne({ _id: listId, user });
        if (!foundList) {
          return res
            .status(400)
            .json({ message: "List not found or does not belong to user." });
        }
      }
      const task = new Task({
        title,
        description,
        dueDate,
        user,
        list: listId,
      });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Internal server error: ${error.message}`);
      }
      res
        .status(500)
        .json({ message: "Internal server error, try again later" });
    }
  }

  /**
   * Get all existing tasks.
   */
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find();

      res.status(200).json(tasks);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Internal server error: ${error.message}`);
      }
      res
        .status(500)
        .json({ message: "Internal server error, try again later" });
    }
  }

  /**
   * Delete task related to the id received.
   */
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        return res.status(404).js;
        on({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Internal server error: ${error.message}`);
      }
      res
        .status(500)
        .json({ message: "Internal server error, try again later" });
    }
  }
}

/**
 * Export a singleton instance of TaskController.
 */
module.exports = TaskController;
