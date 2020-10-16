/* -----------------------------------------------------------------------
   * @ description : Main module containing all the Event management functonality
----------------------------------------------------------------------- */

import Mongoose from "mongoose";
import User from "../collections/user";
import Room from "../collections/room";
import Message from "../collections/message";
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_MESSAGE
} from "../utilities/constants";
export default {

  /************ Authenticate user on make socket connection ********/
  authenticate: async (request, callback) => {
    const { token, socketId } = request;
    const user = await User.checkToken(token);
    if (user) {
      // await User.updateUserInfo(user._id, { socketId });
      const rooms = await Room.findByCondition({
        members: { $elemMatch: { userId: user._id, status: 1 } }
      }).select({ createdBy: 1 });
      // eslint-disable-next-line standard/no-callback-literal
      callback({ user, rooms });
    }
    callback(null);
  },
 
  /************ Save messages **********/
  sendMessage: async (request, callback) => {
    if(request.roomId != null && request.userId != null){
        let message = await Message.saveMessage({ ...request});
        if (message) {
          const payload = {
            id: request.roomId,
            lastMessage: request.message,
            lastMessageBy: request.userId,
            lastMessageDate: new Date()
          };
          const roomData = await Room.update(payload);
          message = await Message.findByCondition({
            _id: Mongoose.Types.ObjectId(message._id)
          }).populate("userId", "_id firstName lastName profileImage");
         
          const targetId = roomData.members.filter(obj => {
            if (obj.userId != request.userId) {
              return obj;
            }
          });
         
        } else {
          callback(null);
        }
    }
    
  },
  /************ Logout socket session on discoonect socket **********/
  disconnect: async (request, callback) => {
    const { userId } = request;
    const rooms = await Room.findByCondition({
      members: { $elemMatch: { userId, status: 1 } }
    }).select({ createdBy: 1 });
    // eslint-disable-next-line standard/no-callback-literal
    callback(rooms);
  },
  
  /************ Create Room for messages **********/
  createRoom: async (data, callback) => {
    console.log("********Room Create*******");
    let room = await Room.findOneByCondition({
        $and: [{
          "members.userId": data.to
        }, {
          "members.userId": data.from
        }]
    });
    if (!room) {
      room = await Room.add({
        createdBy: data.to,
        members: [
          {
            userId: data.to
          },
          {
            userId: data.from
          }
        ]
      });
    }
    const roomData = await Room.findOneByCondition({ _id: room._id })
      .select({
        "members.userId": 1,
        lastMessage: 1,
        lastMessageBy: 1,
        lastMessageDate: 1
      })
      .populate("members.userId", "_id lastName firstName");

    const roomObject = {
      _id: roomData._id,
      lastMessage: roomData.lastMessage,
      lastMessageBy: roomData.lastMessageBy,
      lastMessageDate: null,
      user: roomData.members.find(
        member =>
          member &&
          member.userId &&
          member.userId._id &&
          member.userId._id.toString() !== data.from.toString()
      )
    };
    callback(roomObject);
    /****** Event emitter for room added ************/
   
  },

  updateUser: async (data, callback) => {
      const userData = await User.checkEmail(data.email);
      const pa = await User.updateUser({socketId: data.socketId, userId: userData._id});
      if(pa._id){
        const rooms = await Room.findByCondition({
          members: { $elemMatch: { userId: pa._id, status: 1 } }
        }).select({ createdBy: 1 });
        // eslint-disable-next-line standard/no-callback-literal
        callback({ pa, rooms });
      }else{
      callback(null)
      }
  }

};
