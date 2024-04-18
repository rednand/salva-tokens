const routes = require("express").Router();
const Movie = require("../controllers/MoviesController");

routes.use(function (req, res, next) {
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  } else if (req.query._method == "PATCH") {
    req.method = "PATCH";
    req.url = req.path;
  }
  next();
});

routes.get("/listall",  Movie.listAll, (req, res) => {
  res.render("post");
});
routes.post("/listall/saveToken", Movie.saveTokens);


module.exports = routes;
