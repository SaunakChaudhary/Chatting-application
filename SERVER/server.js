require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DB = require("./Database/db");
const cookieParser = require("cookie-parser");

const { server, app } = require("./Socket/socket");

// Importing Router
const authRouter = require("./Routes/auth.routes");
const messageRouter = require("./Routes/message.routes");
const userRouter = require("./Routes/users.routes");

const corseOption = {
  origin: "https://chatting-application-frontend-4cnl.onrender.com",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());

app.use(cors(corseOption));
app.options("*", cors(corseOption)); // Handle pre-flight requests

// Router
app.post("/aa", (req, res) => {
  res.send("Hello");
});
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);

DB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Listening to the PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
