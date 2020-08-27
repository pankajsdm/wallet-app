import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

const roomSchema = new Schema(
  {
    createdBy: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [
      {
        userId: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: Number, default: 1 }, // 0=> inactive, 1=> active
        createdAt: { type: Date, default: new Date() }
      }
    ],
    type: { type: Number, default: 1 }, // 1=> single, 2=> group
    status: { type: Number, default: 1 }, // 0=> inactive, 1=> active
    lastMessage: { type: String, default: "" },
    lastMessageBy: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
    lastMessageDate: { type: Date, default: new Date() }
  },
  { timestamps: true }
);

export default roomSchema;
