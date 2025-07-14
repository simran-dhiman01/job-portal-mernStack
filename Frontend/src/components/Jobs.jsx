import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const lowerQuery = searchedQuery.toLowerCase().trim();
                // Handle salary range filters
                if (lowerQuery.includes("lpa") || lowerQuery.includes("k")) {
                    const salary = job.salary;

                    // Exact string matching for salary ranges
                    if (lowerQuery === "0-40k") {
                        return salary <= 0.4;
                    } else if (lowerQuery === "42k - 1lpa") {
                        return salary > 0.4 && salary <= 1;
                    } else if (lowerQuery === "1lpa - 5lpa") {
                        return salary > 1 && salary <= 5;
                    } else if (lowerQuery === "5lpa - 10lpa") {
                        const isInRange = salary >= 5 && salary <= 10;
                        return isInRange;
                    } else if (lowerQuery === "above 10lpa") {
                        return salary > 10;
                    }
                }

                // Regular text search
                return job.title.toLowerCase().includes(lowerQuery) ||
                    job.description.toLowerCase().includes(lowerQuery) ||
                    job.location.toLowerCase().includes(lowerQuery) ||
                    `${job.salary}LPA`.toLowerCase().includes(lowerQuery);
            });

            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs