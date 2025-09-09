const GlobalController = require("./GlobalController");
const ListDAO = require("../dao/ListDAO");
const TaskDAO = require("../dao/TaskDAO");

/**
 * Controller class for managing List resources.
 * @extends GlobalController
 */
class ListController extends GlobalController {
  /**
   * Create a new list for a user.
   *
   * @async
   * @function create
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @body {string} title - The title of the list.
   * @body {string} user - The ID of the user who owns the list.
   * @returns {Promise<void>} Sends JSON response with the created list or an error message.
   * @throws {400} If title or user is missing.
   * @throws {409} If a list with the same title already exists for the user.
   * @throws {500} If an internal server error occurs.
   */
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

  /**
   * Retrieve all lists for a specific user.
   *
   * @async
   * @function getUserLists
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {string} req.params.userId - The ID of the user whose lists are requested.
   * @returns {Promise<void>} Sends JSON response with an array of lists or an error message.
   * @throws {400} If userId is missing.
   * @throws {500} If an internal server error occurs.
   */
  async getUserLists(req, res) {
    const user = req.params.userId;

    if (!user) {
      return res.status(400).json({ message: "User is required." });
    }
    try {
      console.log(user);
      const lists = await ListDAO.getAll({ user });
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error getting lists:", error);
      res.status(500).json({
        message: "Internal server error, try again later",
      });
    }
  }

  /**
   * Retrieve all tasks for a specific list.
   *
   * @async
   * @function getListTasks
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {string} req.params.listId - The ID of the list whose tasks are requested.
   * @returns {Promise<void>} Sends JSON response with an array of tasks or an error message.
   * @throws {400} If listId is missing.
   * @throws {500} If an internal server error occurs.
   */
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

/**
 * Export a singleton instance of ListController.
 */
module.exports = new ListController();
