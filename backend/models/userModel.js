import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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

// Middleswares

// For hashing the password
userSchema.pre("save", async function(){
    // if(this.isModified) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
}) 

// For comparing password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = bcrypt.compare(userPassword, this.password)
    return isMatch;
}

// For generating jsonwebtokens
userSchema.methods.createJWT = function(){
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "1d"} )
}

export default mongoose.model("user", userSchema)