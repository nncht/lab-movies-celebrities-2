const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase,
  });

  newCelebrity
    .save()
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity");
    });
});

// // 1) doesn't work
// router.get("/celebrities", async (req, res, next) => {
//   try {
//     let celebrities = await Celebrity.find();
//     console.log(celebrities);
//     res.render("celebrities/celebrities", { celebrities });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// // 2) also doesn't work
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log("Error retrieving celebrities from database.", err);
      res.render("error");
    });
});

module.exports = router;
