const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // Configure mongoose connection with timeout and other settings
    mongoose.connect(process.env.MONGOURI, { useUnifiedTopology: true });

    console.log("Connected to the Database");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    // Optionally, add more detailed error logging here to help debug further
  }
};

module.exports = connectDb;
