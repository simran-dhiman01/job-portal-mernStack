import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const dispatch = useDispatch();

  // Fetch jobs when component mounts or search query changes
  useGetAllJobs();

  useEffect(() => {
    // Clear search query when component unmounts
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>
          {searchedQuery ? `Search Results for "${searchedQuery}"` : 'All Jobs'} ({allJobs.length})
        </h1>
        {allJobs.length === 0 ? (
          <div className='text-center py-10'>
            <p className='text-gray-500 text-lg'>No jobs found matching your search criteria.</p>
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse