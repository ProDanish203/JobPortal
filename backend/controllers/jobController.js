import jobModel from "../models/jobModel.js";
import mongoose from "mongoose";
import moment from "moment/moment.js";

export const createJobController = async (req, res, next) => {
    try{
        const { company, position } = req.body;

        if(!company) return next("Company is required");
        if(!position) return next("Job Position is required");

        req.body.createdBy = req.user.userId;

        const job = await jobModel.create(req.body);

        res.status(201).json({
            success: true,
            message: "Job is now added to the listing",
            job
        })


    }
    catch(error){
        next(error)
    }
}

export const showJobController = async (req, res, next) => {
    try{

        // Filters and Searching
        const { status, workType, search, sort } = req.query; 
        const queryObject = {
            createdBy: req.user.userId
        }

        if(status && status !== "all"){
            queryObject.status = status;
        }

        if(workType && workType !== "all"){
            queryObject.workType = workType;
        }

        if(search){
            queryObject.position = {$regex: search, $options: 'i'};
        }

        let queryResult = jobModel.find(queryObject);

        // Sorting data
        if(sort == "latest"){
            queryResult = queryResult.sort('-createdAt');
        }
        else if(sort == "oldest"){
            queryResult = queryResult.sort('createdAt');
        }

        //Total Jobs Count
        const totalJobs = await jobModel.countDocuments(queryResult)

        // Pagination
        const page = req.query.page || 1
        const limit = req.query.limit || 2
        const skip = (page - 1) * limit

        queryResult = queryResult.skip(skip).limit(limit);
        const noOfPages = Math.ceil(totalJobs / limit)

        const jobs = await queryResult

        // const jobs = await jobModel.find({createdBy: req.user.userId})

        res.status(200).json({
            success: true,
            totalJobs,
            jobs,
            noOfPages
        })

    }
    catch(error){
        next(error);
    }
}



export const updateJobController = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { company, position } = req.body;

        if(!company) return next("Company is required");
        if(!position) return next("Job Position is required");

        const job = await jobModel.findOne({_id: id})
        
        if(!job) return next("No Jobs found");

        if(req.user.userId !== job.createdBy.toString()){
            next("You are not authorized to make changes to this job")
            return; 
        }

        const updateJob = await jobModel.findOneAndUpdate({_id: id}, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(201).json({
            success: true,
            message: "Job Updated Successfully",
            updateJob
        })

    }
    catch(error){
        next("Something Went Wrong")
    }
}


export const deleteJobController = async (req, res, next) => {
    try{
        const {id} = req.params;

        const job = await jobModel.findOne({ _id: id });
        if(!job) return next("No Jobs Found")

        if(req.user.userId !== job.createdBy.toString()){
            next("You are not authorized to make changes to this job")
            return; 
        }

        await job.deleteOne();

        res.status(200).json({
          success: true,
          message: "Job Deleted Successfully",
          job  
        })
    }
    catch(error){
        next(error)
    }
}



// Stats And Filter 
export const jobStatsController = async (req, res, next) => {
    
    const stats = await jobModel.aggregate([
        // Search by user jobs
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1},
            }
        }
    ])

    // time based job filter
    let monthlyApplications = await jobModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: {$year: "$createdAt"},
                    month: {$month: "$createdAt"}
                },
                count: { $sum: 1},
            }
        }
    ])

    // Formatting the date
    monthlyApplications = monthlyApplications.map(item => {
        const {_id:{year, month}, count} = item;
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count };
    }).reverse()

    res.status(200).json({
        success: true,
        message: "Filtered Output",
        totalJobs: stats.length,
        stats,
        monthlyApplications
    })

}
