const express = require("express"),
         port = 8000,
          app = express();

app.use(express.static( __dirname + "/static" ));

const server = app.listen( port, () => {
    console.log(`Listening on port ${port}`);
});
const io = require("socket.io")(server);

const votes = {
    "burger": 0,
    "pizza": 0
};

io.on('connection', (socket) => {

    console.log(socket.id);

    socket.on('c', data => {
        console.log(data);
    });

    socket.on('vote', data => {
        console.log(data);
        votes[data.choice]++;
        io.emit('results', votes);
    });

});