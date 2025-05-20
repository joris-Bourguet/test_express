// scripts/generateJwt.js
const path = require('path');
const { SignJWT } = require('jose');
const { importPKCS8 } = require('jose');
const fs = require('fs');


// Lire la clé privée (PEM format)
const privateKeyPem = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');

// Fonction asynchrone pour signer un JWT
exports.generateJwt = async () => {
  // Convertir PEM → CryptoKey
  const privateKey = await importPKCS8(privateKeyPem, 'RS256');

  // Payload (données que tu veux inclure dans le token)
  const payload = {
    sub: '1234567890',
    name: 'Jean Dupont',
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
  };

  // Créer le JWT
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setExpirationTime('2h') // ou '1d', '15m', etc.
    .sign(privateKey)

  return jwt
}