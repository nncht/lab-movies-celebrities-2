// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.get("/celebrities", async (req, res, next) => {
  try {
    let celebrities = await Celebrity.find();
    console.log(celebrities);
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    console.log("Something went wrong.");
  }
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCelebrity) => {
      console.log("Successfully added new celebrity to the DB!");
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log("Error while creating a new celebrity: ", error);
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
