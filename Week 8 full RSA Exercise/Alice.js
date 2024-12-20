const crypto = require('crypto');

const message = "I want some apples";
const options = {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
};

const { privateKey: senderPrivateKey, publicKey: senderPublicKey } = crypto.generateKeyPairSync("rsa", options);

const sign = crypto.createSign('SHA256');
sign.update(message);
sign.end();
const signature = sign.sign(senderPrivateKey, 'hex');

console.log(`Signature: ${signature}`);
console.log(`Message: ${message}`);
console.log(`Public Key: ${senderPublicKey}`);