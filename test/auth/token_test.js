const { readKeyFromFs, importPrivateKey, generateJWT, importPublicKey, verifyJWT  } = require('../../src/auth/token');
const { destroy } = require('../../src/db');
const expect = require('chai').expect;

describe('auth/token', function () {

    it('calls generateJWT', async function () {
      let key = readKeyFromFs('certs/key-pkcs8.pem');
      let privateKey = await importPrivateKey(key);
      let expiresIn = '3600s';
      let jwt = await generateJWT(privateKey, expiresIn);
      if (jwt.length < 0) {
        throw new Error('assertion failed');
      }
    })

    it('calls verifyJWT', async function () {
      let key = readKeyFromFs('certs/key-pkcs8.pem');
      let privateKey = await importPrivateKey(key);
      let expiresIn = '3600s';
      let jwt = await generateJWT(privateKey, expiresIn);
      if (jwt.length < 0) {
        throw new Error('assertion failed');
      }

      key = readKeyFromFs('certs/cert.pem');
      publicKey = await importPublicKey(key);
      let res = await verifyJWT(jwt, publicKey);
      expect(res).to.have.property('payload');
      expect(res).to.have.nested.property('payload.exp');
      expect(res).to.have.property('protectedHeader');
    })
})
