const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

let registeredUsername = "";
let username = "";
const users = new Map();

// RSA generation
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

socket.on("connect", () => {
  console.log("Connected to the server");

  // Receive users from server's "init" event
  socket.on("init", (keys) => {
    keys.forEach(([user, key]) => users.set(user, key));
    console.log(`There are currently ${users.size} users in the chat`);

    rl.question("Enter your username: ", (input) => {
      username = input;
      registeredUsername = input;
      console.log(`Welcome, ${username} to the chat`);

      // register public key to server
      socket.emit("registerPublicKey", {
        username,
        publicKey: publicKey.export({ type: "pkcs1", format: "pem" }),
      });
      rl.prompt();

      rl.on("line", (message) => {
        if (message.trim()) {
          if ((match = message.match(/^!impersonate (\w+)$/))) {
            username = match[1];
            console.log(`Now impersonating as ${username}`);
          } else if (message.match(/^!exit$/)) {
            username = registeredUsername;
            console.log(`Now you are ${username}`);
          } else {


            // new signature for the message before being sent
            const sign = crypto.createSign("sha256"); // create signature
            sign.update(message); 
            sign.end();
            const signature = sign.sign(privateKey, "hex");

            socket.emit("message", {
              username,
              message,
              signature,
            });
          }
        }
        rl.prompt();
      });
    });
  });
});

// For handling new users joining
socket.on("newUser", (data) => {
  const { username, publicKey } = data;
  users.set(username, publicKey);
  console.log(`${username} joined the chat`);
  rl.prompt();
});

// Receiving messages and verifying signature
socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, signature } = data;
  
    // check if the usernames match
    if (senderUsername !== username) {
      const senderPublicKey = users.get(senderUsername);
  
      if (senderPublicKey && signature) {
        const verify = crypto.createVerify("sha256"); // create verification with sha256
        verify.update(senderMessage);
        verify.end();
  
        // melakukan proses verifikasi signature dengan kunci publik pengirim
        // Jika signature cocok dengan pesan dan kunci publik yang diberikan, fungsi ini mengembalikan `true`
        // verification process, if the signature matches, return true
        const isVerified = verify.verify(senderPublicKey, signature, "hex");
  
        if (isVerified) {
          console.log(`${senderUsername}: ${senderMessage}`); // if true message sent 
        } else {
          console.log(`${senderUsername}: ${senderMessage}`); // if false, warning
          console.log(`Warning: This user is fake`);
        }
      } else if (!signature) {
        // signature made or not yet
        console.log(`Warning: ${senderUsername} sent a message without a signature`);
      } else {
        // public key made or not yet
        console.log(`Warning: No public key found for ${senderUsername}`);
      }
    }
  
    rl.prompt();
  });
  

// Handling disconnects
socket.on("disconnect", () => {
  console.log("Server disconnected, Exiting...");
  rl.close();
  process.exit(0);
});

rl.on("SIGINT", () => {
  console.log("\nExiting...");
  socket.disconnect();
  rl.close();
  process.exit(0);
});