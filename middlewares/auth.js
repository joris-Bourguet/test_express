// middlewares/authenticateJWT.js
const fs = require('fs');
const path = require('path');
const {importSPKI, jwtVerify} = require('jose');
const {generateJwt} = require("../scripts/generateJwt");

// Lire la clé publique au format PEM
const publicKeyPem = fs.readFileSync(path.join(__dirname, '../keys/public.pem'), 'utf8');

// Transformer le PEM en CryptoKey utilisable par jose
let publicKey;
(async () => {
  publicKey = await importSPKI(publicKeyPem, 'RS256');
})();

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Token manquant ou invalide'});
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!publicKey) {
      return res.status(500).json({message: 'Clé publique non prête'});
    }

    const {payload} = await jwtVerify(token, publicKey);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({message: 'Token invalide ou expiré'});
  }
};
