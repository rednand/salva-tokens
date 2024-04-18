const CommingSoonMovies = require("../models/CommingMovie");

const listAll = async (req, res, next) => {
  try {
    const spends = await CommingSoonMovies.tokens.find();
    res.status(200).json(spends);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

const saveTokens = async (req, res) => {
  try {
    const movie = new CommingSoonMovies.tokens();
    movie.token = req.body.token;

    await movie.save();

    res.status(200).json({
      message: `Token salvo`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Falha ao salvar token`,
    });
  }
};


module.exports = {
  listAll,
  saveTokens,
};
