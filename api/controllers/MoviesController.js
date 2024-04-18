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
    const token = req.body.token;
    const existingToken = await CommingSoonMovies.tokens.findOne({ token });

    if (existingToken) {
      return res.status(400).json({ message: "Token ja existe" });
    }

    const newToken = new CommingSoonMovies.tokens({ token });
    await newToken.save();

    res.status(200).json({ message: "Token salvo com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Falha ao salvar token" });
  }
};


module.exports = {
  listAll,
  saveTokens,
};
