// const express = require('express');
// const app = express();
// const PORT = 4000;



// //Add this before the app.get() block
// socketIO.on('connection', (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);
//     socket.on('disconnect', () => {
//       console.log('🔥: A user disconnected');
//     });
// });


// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Hello world',
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });



 
 

// //New imports
// const http = require('http').Server(app);
// const cors = require('cors');

// app.use(cors());

// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Hello world',
//   });
// });

// http.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });



// const socketIO = require('socket.io')(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });





// // socketIO.on('connection', (socket) => {
// //     console.log(`⚡: ${socket.id} user just connected!`);
  
// //     //Listens and logs the message to the console
// //     socket.on('message', (data) => {
// //       console.log(data);
// //     });
  
// //     socket.on('disconnect', () => {
// //       console.log('🔥: A user disconnected');
// //     });
// //   });




//   socketIO.on('connection', (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);
  
//     //sends the message to all the users on the server
//     socket.on('message', (data) => {
//       socketIO.emit('messageResponse', data);
//     });
  
//     socket.on('disconnect', () => {
//       console.log('🔥: A user disconnected');
//     });
//   });



//   let users = [];

// socketIO.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on('message', (data) => {
//     socketIO.emit('messageResponse', data);
//   });

//   //Listens when a new user joins the server
//   socket.on('newUser', (data) => {
//     //Adds the new user to the list of users
//     users.push(data);
//     // console.log(users);
//     //Sends the list of users to the client
//     socketIO.emit('newUserResponse', users);
//   });

//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//     //Updates the list of users when a user disconnects from the server
//     users = users.filter((user) => user.socketID !== socket.id);
//     // console.log(users);
//     //Sends the list of users to the client
//     socketIO.emit('newUserResponse', users);
//     socket.disconnect();
//   });
// });
















// socketIO.on('connection', (socket) => {
//     // console.log(`⚡: ${socket.id} user just connected!`);
//     // socket.on('message', (data) => {
//     //   socketIO.emit('messageResponse', data);
//     // });
  
//     socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
  
//     // socket.on('newUser', (data) => {
//     //   users.push(data);
//     //   socketIO.emit('newUserResponse', users);
//     // });
  
//     // socket.on('disconnect', () => {
//     //   console.log('🔥: A user disconnected');
//     //   users = users.filter((user) => user.socketID !== socket.id);
//     //   socketIO.emit('newUserResponse', users);
//     //   socket.disconnect();
//     // });
//   });











const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});