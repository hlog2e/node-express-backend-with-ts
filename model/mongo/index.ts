import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI!, {
  dbName: "close-friend",
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD,
});

const mongo = mongoose.connection;

mongo.on("error", (err) => {
  console.log("DB Connection Lost!");
  console.log(err);
});

mongo.once("open", () => {
  console.log("DB Connected!");
});
