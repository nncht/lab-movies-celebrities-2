// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// All routes

// Route 1: GET add movie page
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

// Route 2: POST new movie
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

// Route 3: GET movie by ID
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

// Route 4: Delete movie by ID
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

// Route 5: GET edit movie page
router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((calledMovie) => {
      Celebrity.find().then((calledCast) => {
        console.log(calledMovie);
        console.log(calledCast);
        res.render("movies/edit-movie", {
          movieToEdit: calledMovie,
          castToEdit: calledCast,
        });
      });
    })
    .catch((error) => {
      console.log("An error occured: ", error);
    });
});

// Route 6: Update movie
router.post("/movies/:id/", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then((movieToUpdate) => {
      console.log(movieToUpdate);
      res.redirect(`/movies/${movieToUpdate.id}`);
    })
    .catch((error) => {
      console.log("An error occured: ", error);
    });
});

module.exports = router;
