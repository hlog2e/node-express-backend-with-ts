import mongoose from "mongoose";

const schema = new mongoose.Schema(
  { users: [] },
  { timestamps: true, versionKey: false }
);
//schema.index({ _id: 1 });

module.exports = mongoose.model("ChatRoom", schema);
