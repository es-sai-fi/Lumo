const Task = require('../models/Tasks');
const List = require('../models/List');

const TaskController = {
  async createTask(req, res) {
    try {
      const { title, description, dueDate, user, list } = req.body;
      if (!title || !user) {
        return res.status(400).json({ message: 'Title and user are required.' });
      }
      let listId = list;
      // Si no se especifica lista, buscar o crear la lista "General Tasks" para el usuario
      if (!listId) {
        let generalList = await List.findOne({ name: 'General Tasks', user });
        if (!generalList) {
          generalList = new List({ name: 'General Tasks', user });
          await generalList.save();
        }
        listId = generalList._id;
      } else {
        // Validar que la lista exista y pertenezca al usuario
        const foundList = await List.findOne({ _id: listId, user });
        if (!foundList) {
          return res.status(400).json({ message: 'List not found or does not belong to user.' });
        }
      }
      const task = new Task({
        title,
        description,
        dueDate,
        user,
        list: listId
      });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  }
  ,
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }
  ,
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
};

module.exports = TaskController;
