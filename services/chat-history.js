/*
 * @file: chat-history.js
 * @description: It Contain function layer for listing history of chat service.
 * @author: Pankaj Pandey
 */
import Message from "../collections/message";
import mongoose from "mongoose";

/********** List chat History **********/
export const chat_history = async (userId, data) => {
  if(userId){
    if(data.roomId){
        return {
          records: await Message.findByCondition({
            roomId: data.roomId 
          })
            .populate("userId", "_id firstName lastName")
            .skip(data.skip_count)
            .limit(data.limit_count),
          total: await Message.findByCondition({
            roomId: data.roomId 
          }).count()
        }
    }if(data.appointmentId){
        return {
          records: await Message.findByCondition({
            appointmentId: data.appointmentId 
          })
            .populate("userId", "_id firstName lastName")
            .skip(data.skip_count)
            .limit(data.limit_count),
          total: await Message.findByCondition({
            appointmentId: data.appointmentId 
          }).count()
        }
    }
  }

};

