const crypto = require("crypto");

// Target hash
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Function to hash a given input with MD5
function md5Hash(input) {
    return crypto.createHash("md5").update(input).digest("hex");
}

// Brute force function
function bruteForcePIN() {
    for (let pin = 0; pin <= 9999; pin++) {
        // Convert pin to 4-digit string (e.g., 0000, 0001, ..., 9999)
        const pinStr = pin.toString().padStart(4, "0");

        // Hash the pin and compare with the target hash
        if (md5Hash(pinStr) === targetHash) {
            return pinStr; // PIN found
        }
    }
    return null; // PIN not found
}

// Execute brute force
const pin = bruteForcePIN();
if (pin) {
    console.log(`Alice's PIN is: ${pin}`);
} else {
    console.log("PIN not found.");
}
