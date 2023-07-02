import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password length should be greater than 6 characters"]
    },
    location: {
        type: String,
        default: "Pakistan"
    },

},
    { timestamps: true}
)

export default mongoose.model("user", userSchema)