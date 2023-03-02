const jose = require('jose');

const fs = require('fs');

const JWT_CLAIMS = {
  'urn:example:claim': true,
};
const JWT_ISSUER = 'usrv';
const JWT_AUDIENCE = 'api';
const JWT_EXPIRATION_TIME = '2h';

function readKeyFromFs(keyFilePath) {
  let key = fs.readFileSync(keyFilePath, 'utf8');
  return key;
}

async function importPrivateKey(privateKey) {
  let key = await jose.importPKCS8(privateKey, 'RS256');
  return key;
}

async function importPublicKey(publicKey) {
  let key = await jose.importX509(publicKey, 'RS256');
  return key;
}

async function generateJWT(privateKey, expiresIn, claims) {

  let allClaims;

  if (claims) {
    allClaims = {
      ...JWT_CLAIMS,
      ...claims
    }
  } else {
    allClaims = {
      ...JWT_CLAIMS,
      ...claims
    }
  }

  const jwt = await new jose.SignJWT(allClaims).setProtectedHeader({ alg: 'RS256' }).setIssuedAt().setIssuer(JWT_ISSUER).setAudience(JWT_AUDIENCE).setExpirationTime(expiresIn).sign(privateKey);

  return jwt;
}

async function verifyJWT(jwt, publicKey) {
  const { payload, protectedHeader } = await jose.jwtVerify(jwt, publicKey, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });

  return {
    payload: payload,
    protectedHeader: protectedHeader,
  }
}

exports.readKeyFromFs = readKeyFromFs;
exports.importPrivateKey = importPrivateKey;
exports.importPublicKey = importPublicKey;
exports.generateJWT = generateJWT;
exports.verifyJWT = verifyJWT;
