import { Types } from "mongoose";
import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";

export const updateProfile = async (req: any, res: any) => {
  try {
    const { profilePicture } = req.body;

    const userId = req.user._id;

    if (!profilePicture)
      return res.status(400).json({ message: "Profile picture is required" });

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    // to give the object after the update was applied.
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Updated successfully", updatedUser: updatedUser });
  } catch (error) {
    console.log("Error in updateProfile user.controller ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getContactsForSidebar = async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const contacts = await User.findById(userId)
      .select("contacts")
      .populate("contacts", "fullName profilePicture");

    res.status(200).json(contacts);
  } catch (error) {
    console.log("error in getting contacts for sidebar: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchUser = async (req: any, res: any) => {
  try {
    const { username } = req.body;
    const userId = req.user._id;

    if (!username) return res.status(400).json({ message: "No username" });

    const result = await User.find({
      fullName: {
        $regex: username,
        $options: "i", // to make the case insensitive
      },
      _id: { $ne: userId },
    }).select("fullName profilePicture");

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in search user controller error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addContact = async (req: any, res: any) => {
  // note:
  // use routeAuth to be able to access the .user
  // button -> value names

  try {
    const { fullName } = req.body;
    const userId = req.user._id;

    const receiver = await User.findOne({ fullName });
    const user = await User.findById(userId);

    if (!receiver) return res.status(404).json({ message: "User not found" });
    if (user?.contacts.includes(receiver._id))
      return res
        .status(400)
        .json({ message: "User is already in your contact" });

    user?.contacts.push(receiver._id);
    await user?.save();

    res.status(200).json({message: "Contact added successfully"})
  } catch (error) {
    console.log("Error in add contact controller error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeContact = async (req: any, res: any) => {
  // note:
  // use routeAuth to be able to access the .user
  // button -> value names

  try {
    const { fullName } = req.body;
    const userId = req.user._id;

    const receiver = await User.findOne({ fullName });
    const user = await User.findById(userId);

    if (!receiver) return res.status(404).json({ message: "User not found" });
    if (!user?.contacts.includes(receiver._id))
      return res
        .status(400)
        .json({ message: "User is not in your contact list" });

    (user?.contacts as Types.Array<Types.ObjectId>).pull(receiver._id)
    await user?.save();
    res.status(200).json({message: "Deleted successfully"})
  } catch (error) {
    console.log("Error in add contact controller error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};