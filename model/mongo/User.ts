import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    phoneNumber: String,
    sex: String,
    age: Number,
    profilePhotos: [],
    location: { lat: Number, lon: Number },
    likes: Number,
  },
  { timestamps: true, versionKey: false }
);
//schema.index({ _id: 1 });

module.exports = mongoose.model("User", schema);
