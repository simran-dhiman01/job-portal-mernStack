import {Job} from '../models/job.model.js';


export const postJob = async(req,res) =>{
    try {
        const { title, description, requirements, salary, location, jobType, experience, TotalOpenings, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !TotalOpenings|| !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            TotalOpenings,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log('error');
    }
}
//for candidate search
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { 
                    $expr: { 
                        $regexMatch: { 
                            input: { $concat: [{ $toString: "$salary" }, "LPA"] }, 
                            regex: keyword, 
                            options: "i" 
                        } 
                    } 
                }
            ]
        };
        
        const jobs = await Job.find(query)
            .populate({
                path: "company",
                select: "name logo" // Only select necessary company fields
            })
            .select("title description location salary jobType TotalOpenings company createdAt") // Explicitly select job fields
            .sort({ createdAt: -1 });
        
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        .populate('company')
        .populate({
           path:"applications",
           populate: {
            path: 'applicant',
            select: '_id'  // Only select the _id field of the applicant
        }
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}