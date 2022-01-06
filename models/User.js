const mongoose = require("mongoose");
// const ObjectId = require("mongodb").ObjectID;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        {
          username: "David",
          email: "dave@email.com",
          thoughts: ["61d6ccda6929d78e8643b505"],
          friends: ["61d55058567815a311862530"],
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

module.exports = User;
