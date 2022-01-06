const mongoose = require("mongoose");
// const ObjectId = require("mongodb").ObjectID;

const dateGetter = (date) => {
  return date.toString();
};

const reactionSchema = new mongoose.Schema({
  //   reactionId
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: { type: Date, default: () => Date.now(), get: dateGetter },
  username: { type: String, required: true },

  // Use Mongoose's ObjectId data type
  // Default value is set to a new ObjectId
  // reactionBody

  // String
  // Required
  // 280 character maximum
  // username

  // String
  // Required
  // createdAt
});

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true, maxLength: 280, minLength: 1 },
    // check date format for date getter.
    createdAt: { type: Date, default: () => Date.now(), get: dateGetter },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  { toJSON: { getters: true } }
);

const Thought = mongoose.model("Thought", thoughtSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
Thought.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thought.insertMany(
      [
        {
          username: "Tom",
          thoughtText: "my dog is nice",
          reactions: [
            { reactionBody: "wow", username: "Jen" },
            { reactionBody: "this sucks... wow", username: "Daniel" },
          ],
        },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});

module.exports = Thought;
