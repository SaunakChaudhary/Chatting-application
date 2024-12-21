const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // Configure mongoose connection with timeout and other settings
    const connection = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // Timeout for server selection (30 seconds)
      socketTimeoutMS: 45000,           // Timeout for socket communication (45 seconds)
    });
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Database Connection Error:", error.message);
    // Optionally, add more detailed error logging here to help debug further
  }
};

module.exports = connectDb;
