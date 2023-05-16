//imports
const express = require("express");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const cors = require('cors')

//dotenv
const dotenv = require("dotenv");
dotenv.config();

//express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//routes import
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const listRoutes = require("./routes/lists");


//mongo connection
const dbUrl = process.env.DB_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

//routes
app.get("/", (_req, res) => {
  res.send("home");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);


//catch all route
app.all("*", (req, res, next) => {
  next(new ExpressError("page not Found", 404));
});

//error handling
app.use((err, _req, res, _next) => {
  const { status = 500, message = "oh no something went wrong" } = err;
  res.status(status).json(message);
});
//connection port 8000
app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend running on port ${process.env.PORT || 8000}`);
});
