const Mongoose = require("mongoose");

const RecordSchema  = new Mongoose.Schema(
  {
    key: String,
    createdAt: Date,
    counts: [
      Number
    ]
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("record", RecordSchema);