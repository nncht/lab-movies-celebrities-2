// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((celebritiesFromDB) => {
    res.render("movies/new-movie", { celebrities: celebritiesFromDB });
  });
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
    .then((newMovie) => {
      console.log("Successfully added new movie to the DB!");
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Error while creating a new movie: ", error);
      res.render("movies/new-movie");
    });
});

router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((moviefromDB) => {
      console.log(moviefromDB);
      res.render("movies/movie-details", { details: moviefromDB });
    })
    .catch((error) => {
      console.log("An error occured: ", error);
    });
});

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then((movieToDelete) => {
      console.log(movieToDelete);
      res.redirect("/movies");
    })
    .catch((error) => {
      console.log("Movie couldn't be deleted.");
    });
});

module.exports = router;
