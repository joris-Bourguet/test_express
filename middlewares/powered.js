const {generateJwt} = require("../scripts/generateJwt");
module.exports = async (req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Custom-Header', 'Joris');

  const token = await generateJwt();
  req.headers['authorization'] = `Bearer ${token}`; // Ajoute le JWT à la requête

  next();
}