const List = require('../models/List');

const ListController = {
  async createList(req, res) {
    try {
      const { name, description, user } = req.body;
      if (!name || !user) {
        return res.status(400).json({ message: 'Name and user are required.' });
      }
      // Check if list with same name exists for this user
      const exists = await List.findOne({ name, user });
      if (exists) {
        return res.status(409).json({ message: 'List name already exists for this user.' });
      }
      const list = new List({ name, description, user });
      await list.save();
      res.status(201).json(list);
    } catch (error) {
      res.status(500).json({ message: 'Error creating list', error });
    }
  },

  async getListsByUser(req, res) {
    try {
      const { user } = req.query;
      if (!user) {
        return res.status(400).json({ message: 'User is required.' });
      }
      const lists = await List.find({ user });
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching lists', error });
    }
  }
};

module.exports = ListController;
