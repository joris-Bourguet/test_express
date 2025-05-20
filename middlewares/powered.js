const {generateJwt} = require("../scripts/generateJwt");
module.exports = (req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Custom-Header', 'Joris');

  generateJwt().then((signature) => {
    res.setHeader('X-Powered-By', signature);
  })

  next();
}