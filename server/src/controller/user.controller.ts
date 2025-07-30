import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";

export const updateProfile = async(req: any, res: any) => {
    try {
        const {profilePicture} = req.body; 
        
        const userId = req.user._id; 

        if(!profilePicture) return res.status(400).json({message: "Profile picture is required"})

        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
                                                                                                            // to give the object after the update was applied. 
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture:uploadResponse.secure_url}, {new:true})

        res.status(200).json({message: "Updated successfully", updatedUser: updatedUser})


    } catch (error) {
        console.log("Error in updateProfile user.controller ", error)
        res.status(500).json({message: "Internal Server Error"})
        
    }

}