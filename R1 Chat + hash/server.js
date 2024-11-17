const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on("message", (data) => {
        const { username, message, hash } = data;

        console.log(`Forwarding message: "${message}", hash: ${hash}`); // Debug
        io.emit("message", { username, message, hash }); // Forward message and hash without modification
    });

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
