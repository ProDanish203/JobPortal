import userModel from "../models/userModel.js";

export const regController = async (req, res, next) => {
    try{
        // Destructuring the request body
        const { name, email, password } = req.body;

        //Validation 
        // if(!name) return res.status(400).send({ success: false, message: "Name not provided!"});
        if(!name) return next("Name is required")

        if(!email) return next("Email is required")

        if(!password) return next("Password is required and must be greater than 6 characters")

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Email already in use, Please use another email."
            })
        }

        // Creating the user
        const user = await userModel.create({name, email, password})
        res.status(201).send({
            success: true,
            message: "Registeration successfull",
            user
        })

    }
    catch(e){
        // console.log(err);
        // res.status(400).send({
        //     message: "Error in Register ",
        //     success: false,
        //     err
        // })
        next(err)
    }
}