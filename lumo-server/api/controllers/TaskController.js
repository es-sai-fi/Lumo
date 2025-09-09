const GlobalController = require("./GlobalController");
const ListDAO = require("../dao/ListDAO");
const TaskDAO = require("../dao/TaskDAO");

/**
 * Controller class for managing Task resources.
 * @extends GlobalController
 */
class TaskController extends GlobalController {
  /**
   * Create a new task for a specific list and user.
   *
   * @async
   * @function createTask
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @body {string} title - The title of the task (required).
   * @body {string} [description] - Optional task description.
   * @body {string} [status] - Optional status of the task.
   * @body {Date|string} [dueDate] - Optional due date.
   * @body {string} user - The ID of the user who owns the task (required).
   * @body {string} list - The ID of the list the task belongs to (required).
   * @returns {Promise<void>} Sends JSON response with the created task or an error message.
   * @throws {400} If title or user is missing, or if the list does not exist or does not belong to the user.
   * @throws {500} If an internal server error occurs.
   */
  async createTask(req, res) {
    try {
      const { title, description, status, dueDate, user, list } = req.body;

      if (!title || !user) {
        return res.status(400).json({
          message: "Title and user are required.",
        });
      }

      // Validate list exists and belongs to user
      const listExists = await ListDAO.findOne({ _id: list, user });
      if (!listExists) {
        return res.status(400).json({
          message: "List not found or does not belong to user.",
        });
      }

      const task = await TaskDAO.create({
        title,
        description,
        status,
        dueDate,
        user,
        list,
      });

      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }

  /**
   * Update an existing task.
   *
   * @async
   * @function updateTask
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {string} req.params.id - The ID of the task to update.
   * @body {string} [title] - Updated title (optional).
   * @body {string} [status] - Updated status (optional).
   * @body {Date|string} [dueDate] - Updated due date (optional).
   * @body {string} [list] - Updated list ID (optional, must belong to the user).
   * @body {string} user - The ID of the user who owns the task.
   * @returns {Promise<void>} Sends JSON response with the updated task or an error message.
   * @throws {404} If the task does not exist or does not belong to the user.
   * @throws {400} If the new list does not exist or does not belong to the user.
   * @throws {500} If an internal server error occurs.
   */
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, status, dueDate, list } = req.body;
      const userId = req.body.user;

      const task = await TaskDAO.findOne({ _id: id, user: userId });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (list && list !== task.list.toString()) {
        const listExists = await ListDAO.findOne({ _id: list, user: userId });
        if (!listExists) {
          return res.status(400).json({
            message: "List not found or does not belong to user.",
          });
        }
        task.list = list;
      }

      if (title) task.title = title;
      if (status) task.status = status;
      if (dueDate) task.dueDate = dueDate;

      await task.save();
      res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }

  /**
   * Delete an existing task.
   *
   * @async
   * @function deleteTask
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {string} req.params.id - The ID of the task to delete.
   * @body {string} user - The ID of the user who owns the task.
   * @returns {Promise<void>} Sends JSON response confirming deletion or an error message.
   * @throws {404} If the task does not exist or does not belong to the user.
   * @throws {500} If an internal server error occurs.
   */
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const { user } = req.body;

      const deletedTask = await TaskDAO.findOneAndDelete({
        _id: id,
        user,
      });

      if (!deletedTask) {
        return res.status(404).json({
          message: "Task not found or you don't have permission",
        });
      }

      res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }
}

/**
 * Export a singleton instance of ListController.
 */
module.exports = new TaskController();
