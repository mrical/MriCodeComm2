import mongoose from "mongoose";

function initDB() {
  try {
    if (mongoose.connections?.[0].readyState) {
      console.log("alredy connected");
      return;
    }
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    mongoose.connection.on("connected", () => {
      console.log("connected to mongo");
    });
    mongoose.connection.on("error", (err) => {
      console.log("error connecting", err);
    });
  } catch (error) {
    console.log(error);
  }
}

export default initDB;
