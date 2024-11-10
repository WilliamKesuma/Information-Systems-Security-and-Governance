const crypto = require('crypto');

const signature = '8e56c10d2256abb91cb80c3e54fc0dce5957859082de705e59f8d4794e0ea316181d84e40d7822ea259263d826dc1364543af57aa09e10c585b6d63a984c5d42a16e1f6ec4d062db098137fd154e16325fb18cbf182b420ae0875e1d77dba7402fcb419f91fef6027587326c99d6c4a1e011f34cf16c742d01b382f15ba64a6d25c7aefd7f9fb4bee4b806b14f3fdd53b9c407f4203e27441072220e84f28f1d0e33d3b104ba76532a1030b8abf0f6f520bc845ba1b6d4cb9c7e7a0e24a8814073a2aad5819665397cf8adbec7c17000ebd76dafcd0eb3f58f2414c2fc23e283aa9bef7c2042cae430739ca565faf454bd1977a0cd1ccf37d046e71648056b5d'; // Replace with actual signature from alice.js
const message = 'I want some apples'; 
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp/5jALHojAB9CPpeAhmQ
taGUDSQfhrHYz+FdpXwiNrx0Rxxa17Y4YJDFCIHHdlRVGr2Fgd/aHhHiwwm2efUy
MpFDn4EBCzdndBV7tG0QgUdU3FFOB7rmkDXa9+UqwH1HDLHChTEJxW9wwXZQXFG4
Ba8T5LEss8fAbU0wsj34ZxL94OKxNNbeZtQ7Kh8xcvMDjy1a9j/yi0Uqc0BycsYm
coaLcRDh1t5/NRAVx2O7i3X7MkdzWjaaYmjm/vAIr0P2fwEjxaK8cikGi6+SEHOj
BLTIQWSZ68VHqjba7PQjy/FZYZdhHj9yhsiv1Wvjv7w1pFY8AzcTuC0x9HXBktdf
OQIDAQAB
-----END PUBLIC KEY-----`; 

const verify = crypto.createVerify('SHA256');
verify.update(message);
verify.end();
const isVerified = verify.verify(publicKeyPem, signature, 'hex');

console.log(`Signature Verification: ${isVerified}`);
console.log(`Message: ${message}`);