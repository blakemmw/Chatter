let express = require("express");
let path = require("path");
const timestamp = require('time-stamp');

let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

let port = 8080;

app.use("/", express.static(path.join(__dirname, "dist/chatApp")));

io.on("connection", socket => {

  let user = socket.id;

  console.log("new connection made from client with ID = " + socket.id);

  socket.emit("getMyId", socket.id);

  socket.on("newMsg", data => {
    io.to(socket.id).emit("msg", {
       msg: data.msg, 
       un: data.un,
       clientID: user,
       timeStamp: getCurrentDate()
      });

      //save ID and message 

      var Q1A1 = '';
      var Q1A1 = '';
    
      var username = data.un;
      Q1A1 = data.msg;

      console.log("userID = " + username + "  Response = " + Q1A1 + " date time = "+ timestamp('ss:ms'));


  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});


function getCurrentDate() {
  let d = new Date();
  return d.toLocaleString();
}

