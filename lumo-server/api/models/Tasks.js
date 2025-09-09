const mongoose = require("mongoose");

<<<<<<< HEAD
/**
 * Task schema definition.
 *
 * Represents application tasks stored in MongoDB.
 * Includes authentication fields and automatic timestamps.
 */
=======
>>>>>>> main
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
<<<<<<< HEAD
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
=======
      required: [true, "A title is required"],
      trim: true,
      maxlength: [100, "The title cannot have more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "The description cannot have more than 1000 characters"],
    },
    status: {
      type: String,
      enum: ["On going", "Unassigned", "Done"],
      default: "Unassigned",
    },
    dueDate: {
      type: Date,  // Almacena fecha y hora juntas
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
>>>>>>> main
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
<<<<<<< HEAD
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
=======
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
>>>>>>> main
