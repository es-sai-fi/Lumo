const mongoose = require("mongoose");

/**
 * Task schema definition.
 *
 * Represents application tasks stored in MongoDB.
 * Includes authentication fields and automatic timestamps.
 */
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true, // puedes hacerlo false si prefieres asignar después, pero mejor exigir list
    },
  },
  { timestamps: true },
);

/**
 * Mongoose model for the Task collection.
 * Provides an interface to interact with task documents.
 */
module.exports = mongoose.model("Task", TaskSchema);
