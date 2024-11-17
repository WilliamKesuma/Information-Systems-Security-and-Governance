const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto");

const socket = io("http://localhost:3000");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});

let username = "";

socket.on("connect", () => {
    console.log("Connected to the server");

    rl.question("Enter your username: ", (input) => {
        username = input;
        console.log(`Welcome ${username} to the chat`);

        rl.prompt();

        rl.on("line", (message) => {
            if (message.trim()) {
                const sanitizedMessage = message.trim(); // Sanitize input
                const hash = crypto.createHash("sha256").update(sanitizedMessage).digest("hex");

                console.log(`Sending message: "${sanitizedMessage}", hash: ${hash}`); // Debug
                socket.emit("message", { username, message: sanitizedMessage, hash });
            }
            rl.prompt();
        });
    });
});

socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, hash: senderHash } = data;

    const calculatedHash = crypto.createHash("sha256").update(senderMessage).digest("hex");
    console.log(`Received message: "${senderMessage}", hash: ${senderHash}`); // Debug

    if (senderUsername !== username) {
        if (calculatedHash !== senderHash) {
            console.warn("Warning: The message may have been changed during transmission!");
        } else {
            console.log(`${senderUsername}: ${senderMessage}`);
        }
    }
    rl.prompt();
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
    rl.close();
    process.exit(0);
});

rl.on("SIGINT", () => {
    console.log("\nExiting...");
    socket.disconnect();
    rl.close();
    process.exit(0);
});
    