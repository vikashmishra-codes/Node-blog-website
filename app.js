const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const { render } = require("ejs");
require("dotenv/config");
const app = express();

// connect to mongo db
const dbUrl = process.env.MONGO_CONNECT_URI;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("conencted to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// set the view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// basic routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// redirect
// app.get("/about-me", (req, res) => {
//   res.redirect("/about");
// });

// error 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
