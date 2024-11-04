const crypto = require("crypto");

const keyText = "the-quick-brown-fox-jump-over-to"; // 32 characters for 256-bit key
const ivAgus = Buffer.from("this-iv-for-agus", "utf8"); // IV 16 bytes long
const ivSusi = Buffer.from("this-iv-for-susi", "utf8"); // IV 16 bytes long

const key = Buffer.from(keyText, "utf8");

const message = "this is a secret message";

// Encrypt with ivAgus
const cipherAgus = crypto.createCipheriv("aes-256-cbc", key, ivAgus);
let ciphertextAgus = cipherAgus.update(message, "utf8", "hex");
ciphertextAgus += cipherAgus.final("hex");
console.log("Ciphertext with ivAgus:", ciphertextAgus);

// Encrypt with ivSusi
const cipherSusi = crypto.createCipheriv("aes-256-cbc", key, ivSusi);
let ciphertextSusi = cipherSusi.update(message, "utf8", "hex");
ciphertextSusi += cipherSusi.final("hex");
console.log("Ciphertext with ivSusi:", ciphertextSusi);
