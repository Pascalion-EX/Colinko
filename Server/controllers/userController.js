import UserModel from "../models/UserModel";

export const getUserData = async (req,res) =>{
    try {
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.json({
                success: false,
                message: "User is not found"
            });
        }
        res.json({
            success:true,
            userData:{
                name: user.name,
                isAccountVerified: user.isAccountVerified,
                role: user.role,
                email: user.email,
                isMember: user.isMember,
            }
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const updateUserName = async (req, res) => {
    try {
        if (!req.userId) {
            return res.json({
                success: false,
                message: "Authentication is required"
            });
        }

        const { name } = req.body ?? {};
        if (typeof name !== "string" || !name.trim()) {
            return res.json({
                success: false,
                message: "Name must be a non-empty string"
            });
        }

        const user = await UserModel.findByIdAndUpdate(
            req.userId,
            { $set: { name: name.trim() } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.json({
                success: false,
                message: "User is not found"
            });
        }

        return res.json({
            success: true,
            message: "Name updated successfully",
            userData: { name: user.name }
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};