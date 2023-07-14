import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { name, email, location } = req.body;

    if(!name || !email || !location){
        next('All Fields Are Required')
    }

    const user = await userModel.findOne({_id: req.user.userId});
    user.name = name;
    user.email = email;
    user.location = location;

    await user.save();

    const token = user.createJWT();

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: {
            name: user.name,
            email: user.email,
            location: user.location
        },
        token
    })
}


export const getUserController = async (req, res, next) => {
    try{
        const user = await userModel.find({_id: req.body.user.userId})

        user.password = undefined;
        if(!user){
            return res.status(200).json({
                success: false,
                message: "User not found"
            })
        }
        else{
            res.status(200).send({
                success: true,
                data: user
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Authentication Error",
            error: err
        })
    }

}