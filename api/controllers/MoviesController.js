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
    const { token, celulares } = req.body;

    const existingToken = await CommingSoonMovies.tokens.findOne({ token });

    if (existingToken && celulares) {
      if (existingToken?.celulares.includes(celulares)) {
        return res.json({
          message: "Número de celular ja adicionado",
        });
      } else {
        existingToken.celulares.push(celulares);
        await existingToken.save();
        return res.json({
          message: "Número de celular adicionado ao token existente",
        });
      }
    } else if (existingToken) {
      return res.json({
        message: "Token já existe",
      });
    }

    const newToken = new CommingSoonMovies.tokens({
      token,
      celulares: [celulares],
    });
    await newToken.save();

    return res.status(200).json({ message: "Token salvo com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Falha ao salvar token" });
  }
};

module.exports = {
  listAll,
  saveTokens,
};
