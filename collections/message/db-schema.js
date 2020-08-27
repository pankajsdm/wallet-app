import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

const messageSchema = new Schema(
  {
    roomId: { type: Mongoose.Schema.Types.ObjectId, ref: "rooms" },
    appointmentId: { type: Mongoose.Schema.Types.ObjectId, ref: "appointments" },
    userId: { type: Mongoose.Schema.Types.ObjectId, ref: "User" }, //message send by user (Customer or vendor)
    type: { type: Number, default: 1 }, // 1=> text, 2=> media
    status: { type: Number, default: 0 }, // 0=> unread, 1=> read, 2=> deleted
    message: { type: String, default: "" },
    image: { type: String, default: "" },
    last_msg: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default messageSchema;
 