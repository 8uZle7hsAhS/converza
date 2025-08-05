import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const getMessages = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: id },
        { senderId: id, receiverId: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get messages - message controller errr: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req: any, res: any) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let tempImageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      tempImageUrl = uploadResponse.secure_url;
    }

    // new message:
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      images: tempImageUrl,
    });

    await newMessage.save();
    res.status(200).jso(newMessage);

    // this part will use the socket.io
  } catch (error) {
    console.log("Error in get messages - message controller errr: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
