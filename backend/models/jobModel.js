import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "company name is required"]
    },
    position: {
        type: String, 
        required: [true, "Job Position is required"]
    },
    status: {
        type: String,
        enum: ["pending", "reject", "interview"],
        default: "pending"
    },
    workType: {
        type: String,
        enum: ["full-time", "part-time", "contract", "internship", "remote"],
        default: "full-time"
    },
    jobLocation: {
        type: String,
        required: [true, "Job location is required"],
        default: "Karachi"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
},
    {timestamps: true}
)

export default mongoose.model("Job", JobSchema);