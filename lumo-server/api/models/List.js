const mongoose = require("mongoose");

<<<<<<< HEAD
/**
 * List schema definition.
 *
 * Represents application users stored in MongoDB.
 * Includes authentication fields and automatic timestamps.
 */
const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String },
    user: {
      // owner of the list
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// A unique index per user+name could be handy to avoid duplicate list names for same user
ListSchema.index({ user: 1, name: 1 }, { unique: true });

/**
 * Mongoose model for the List collection.
 * Provides an interface to interact with list documents.
 */
module.exports = mongoose.model("List", ListSchema);
=======
const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A title is required"],
      trim: true,
      maxlength: [50, "The title cannot have more than 50 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
>>>>>>> main
