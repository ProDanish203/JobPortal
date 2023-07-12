import userModel from "../models/userModel.js";

export const regController = async (req, res, next) => {
    // We can also comment this code as we have added our custom errorMiddleware tha will handle all the errors itself
    // We can also remove this try-catch block bcuz we have already added a library for this: express-async-errors
    try{
        // Destructuring the request body
        const { name, email, password } = req.body;

        //Validation 
        // if(!name) return res.status(400).send({ success: false, message: "Name not provided!"});
        if(!name) return next("Name is required")

        if(!email) return next("Email is required")

        if(!password) return next("Password is required and must be greater than 6 characters")

        if(password.length <= 6) return next("Password must be greater than 6 characters")

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: "Email already in use, Please use another email."
            })
        }

        // Creating the user
        const user = await userModel.create({name, email, password})

        // Creating token
        const token = user.createJWT();

        res.status(201).send({
            success: true,
            message: "Registeration successfull",
            user: {
                name: user.name,
                email: user.email,
                location: user.location
            },
            token
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

export const loginController = async (req, res, next) => {

    try{
        const { email, password } = req.body;
        // Validation
        if(!email) return next("Email is required");
        if(!password) return next("Password is required");

        // finding user
        const user = await userModel.findOne({ email }); 
        if(!user){
            return next("Invalid username or password");
        }

        // Comparing passwords
        const isMatch = await user.comparePassword(password) 
        if(!isMatch){
            return next("Invalid username or password");
        }

        // Emptying the password field for security reasons
        user.password = undefined
        const token = await user.createJWT()

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                location: user.location
            },
            token
            // user
        })

    }
    catch(e){
        next(err)
    }

}