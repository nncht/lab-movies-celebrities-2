// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("movies/new-movie", { celebrities });
});

router.get("/movies", async (req, res, next) => {
  try {
    let movies = await Movie.find();
    console.log(movies);
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log("Something went wrong.");
  }
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((newCelebrity) => {
      console.log("Successfully added new movie to the DB!");
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error while creating a new movie: ", error);
      res.render("celebrities/new-movie");
    });
});

module.exports = router;
