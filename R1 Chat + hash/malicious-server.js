const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on("message", (data) => {
        let { username, message, hash } = data;

        // Malicious modification
        const modifiedMessage = message + " heyyyy ";
        console.log(`Altering message: "${message}" -> "${modifiedMessage}"`);

        // Send modified message with the original hash (to cause mismatch)
        io.emit("message", { username, message: modifiedMessage, hash });
    });

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Malicious server is running on port ${port}`);
});
