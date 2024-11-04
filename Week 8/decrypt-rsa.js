const crypto = require("crypto");

// Modified ciphertext (change first three letters to "123")
const modifiedCiphertextHex = "510cf4e276a5d824ec830fd8729808cf3200db4b26c6590f4e2d0f5694fde215f1a429346aea2c00866fc752b0d62a9387e1f36a1b0fdfd2be164c7bc178ac9bc3b6f488fdafdbb3ae871992257897ab3a3394c2e9384a32b0fa7eebfa51670f922bc21eabb966bee58e586779d8f8af2a387d199e02ea23483a4d3b29b4537fb112ec1c6ae34dd0fa5f0afbf15c3f0fdf96eef0777ee3bd6dd5cb377740185fe90e2f00b5646b92060d4622179b26b2a2045b448971f37507ec5d3aabc1747d6b5aec94a8f9456c050fd62df90a2707727c787368acf4f8dc02b18c83b5d51d568f3334f8f278218aa2b39d98d7877dadbd8e12f9149c9304704e9be5bebf1f";
const modifiedCiphertext = Buffer.from(modifiedCiphertextHex, "hex");

// Different private key for decryption attempt
const differentPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD0tF3JwrF5KvN8
D1bQJfLkWEkMmiZbHML3/eIhTWKvR/TWkDdXVxLrl94zmxH+dOgwhflLQKec67lf
sjHzAYhsbb7kExlLG5hdxrC3guf65cYf8UBWl6jRTrwJ3CnIJ+jb9FxRT92J7Kcf
8xPylbyPKZP8b4sX4hA9ZwbboMgvgUENvj3tDh3MLmOjzBGBpA9is6k4jrcDRS7Q
orw28gxBapO/+xO2iYXixN3fgRXf2M5waY9HtDy5ks+vGqlhM7PQSh9cEv9GHydh
XHMsCPt+S1hK5pNr+1Xa/UybESrhFPAk7O6p+DC4/9IVXHrCQy9MJ3iWybrCuwmc
NmjAYwJBAgMBAAECggEATTxQ0P96V6DpHQzhhoADNT8xnfn5M9HZl6LuqRRtps8V
// MORE LINES
-----END PRIVATE KEY-----`;
const differentPrivateKey = crypto.createPrivateKey(differentPrivateKeyPem);

try {
  // Attempt to decrypt with a different private key
  const recoveredPlaintextDifferentKey = crypto.privateDecrypt(differentPrivateKey, modifiedCiphertext);
  console.log("Recovered Plaintext with Different Key:", recoveredPlaintextDifferentKey.toString("utf8"));
} catch (error) {
  console.error("Error decrypting with different private key:", error.message);
}
