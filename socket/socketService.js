import * as TYPE from "./constants";
const socketIO = require("socket.io");
import Events from "../utilities/event";
import User from "../collections/user";
import socketHandler from "./handler";

export default server => {
  let io = socketIO(server, {
    pingTimeout: 10000
  });
  let users = {};
  io.on("connection", socket => {

    socket.on("shareUserInfo", socketdata => {
       const socketId = socket.id;
        socketHandler.updateUser({socketId: socketdata.socketId, email: socketdata.email}, res => {
          let userId = res.pa._id;
          // Socket local object instance contains user ids corresponding to socket ids
          socket[socketId] = { userId };
          // User local object instance contains socket ids corresponding to user ids and sorties
          users[userId] = { socketId };
          // Join rooms for chat
          res.rooms.map(room => {
            socket.join(room._id);
            return room;
          });
      });
    });

    io.to(socket.id).emit("create_socket", {"socketId": socket.id});
  
    //Testing message
    socket.on('user message', message =>{
      console.log("message ", message)
      socket.emit('responded', "I am good and see you soon");
    })

    //Create Room
	  socket.on("createRoom", data => {
      console.log("testing test", data)
      if(data.to != null && data.from != null){
	        socketHandler.createRoom(data, res => {
	          if (res && socket && !socket.rooms[res._id]) {
	            socket.join(res._id);
	          }
	          io.to(res._id).emit("create_room", {"roomId": res._id});
	        });
	    }
	    else{
	      console.log("Enter receiver and sender ID.");
	    }
    });

    // Disconnect Socket
    socket.on("disconnect", data => {
      const userId = socket && socket[socket.id] ? socket[socket.id].userId : "";
      if (userId) {
        socketHandler.disconnect({ userId }, res => {
          res.map(room => {
            socket.leave(room._id);
          });
        });
      }
      else{
        console.log(`reason: ${data}`);
      }
    });
    
    //send Message
    socket.on("message", data => {
      socketHandler.sendMessage({ ...data }, res => {
        io.to(res.roomId).emit("new_message", res);
        if(res.last_msg){
           io.to(res.roomId).emit("patientNotifyInfo", {"amount": data.amount, "price_bracket_case": data.price_bracket_case, toUserId: data.toUserId});
        }
      });
    });

  });

    Events.on("fireLoggedInEvent", data => {
        if (io && data.userData.socketId) {
          io.to(data.userData.socketId).emit("ChatbotLoginVerification",data);
        }
    });

    Events.on("rejectAppointEvent", data => {
        if (io && data.socketId) {
          io.to(data.socketId).emit("rejectAppointment", {"patientId": data.patientId});
        }
    });
};
