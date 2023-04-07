import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("db connected");
});

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    email: {
      type: String,
    },
    location: {
      type: {
        long: Number,
        lat: Number,
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Messages || mongoose.model("Messages", messageSchema);

type Data = {
  success: boolean;
  messages?: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { message, location, email } = req.body;
    const newMessage = new Message({
      message,
      location,
      email,
    });

    await newMessage.save();

    return res.status(200).json({ success: true });
  } else if (req.method === "GET") {
    const messages = await Message.find();
    return res.status(200).json({ success: true, messages });
  }
}
