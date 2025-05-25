import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Briefcase, Users, Building2, FileText, Target, Award, TrendingUp, Star, CheckCircle } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-gradient-to-b from-white to-gray-50'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl animate-pulse'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                    {/* Left side - Text content */}
                    <div className='flex flex-col space-y-6 text-left'>
                        <div className='inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors duration-300 w-fit'>
                            <span className='text-[#6A38C2] font-medium text-sm'>No. 1 Job Hunt Website</span>
                        </div>

                        <div className='space-y-4'>
                            <h1 className='text-5xl md:text-6xl font-bold tracking-tight leading-tight'>
                                Find the Job <br />
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002] animate-gradient'>
                                    You've Been Dreaming Of!!
                                </span>
                            </h1>
                            <p className='text-lg text-gray-600 max-w-xl'>
                                Your gateway to smarter hiring and better career opportunities.
                            </p>
                        </div>

                        <div className='w-full max-w-xl transform hover:scale-[1.02] transition-transform duration-300'>
                            <div className='flex items-center gap-2 bg-white rounded-full shadow-lg border border-gray-100 p-2 hover:shadow-xl transition-shadow duration-300'>
                                <input
                                    type="text"
                                    placeholder='Find your dream job'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='flex-1 outline-none border-none px-6 py-3 text-gray-700 placeholder-gray-400'
                                />
                                <Button 
                                    onClick={searchJobHandler} 
                                    className="rounded-full bg-[#6A38C2] hover:bg-[#5a2fa3] transition-all duration-300 px-6 py-3 hover:shadow-lg"
                                >
                                    <Search className='h-5 w-5 mr-2' />
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className='flex gap-8 pt-4'>
                            <div className='flex items-center gap-2'>
                                <div className='p-2 rounded-full bg-purple-50'>
                                    <Briefcase className='h-5 w-5 text-[#6A38C2]' />
                                </div>
                                <div>
                                    <div className='font-semibold text-gray-900'>10K+</div>
                                    <div className='text-sm text-gray-500'>Active Jobs</div>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='p-2 rounded-full bg-purple-50'>
                                    <Building2 className='h-5 w-5 text-[#6A38C2]' />
                                </div>
                                <div>
                                    <div className='font-semibold text-gray-900'>5K+</div>
                                    <div className='text-sm text-gray-500'>Companies</div>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='p-2 rounded-full bg-purple-50'>
                                    <Users className='h-5 w-5 text-[#6A38C2]' />
                                </div>
                                <div>
                                    <div className='font-semibold text-gray-900'>15K+</div>
                                    <div className='text-sm text-gray-500'>Job Seekers</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Decorative elements */}
                    <div className='relative hidden lg:block'>
                        <div className='relative w-full aspect-square'>
                            {/* Main decorative circles */}
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-4 border-purple-200 animate-spin-slow'></div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-4 border-blue-200 animate-spin-slow-reverse'></div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-purple-100 to-blue-100'></div>
                            
                            {/* Small decorative circles */}
                            <div className='absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-purple-200 animate-pulse'></div>
                            <div className='absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-blue-200 animate-pulse delay-300'></div>
                            <div className='absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-purple-200 animate-pulse delay-500'></div>
                            
                            {/* Main floating elements with hover effects */}
                            <div className='absolute top-1/5 left-1/3 bg-white p-4 rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group'>
                                <Briefcase className='h-8 w-8 text-[#6A38C2] group-hover:text-[#F83002] transition-colors duration-300' />
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                                    Find Jobs
                                </div>
                            </div>
                            <div className='absolute bottom-1/4 right-1/4 bg-white p-4 rounded-lg shadow-lg transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group'>
                                <Building2 className='h-8 w-8 text-[#6A38C2] group-hover:text-[#F83002] transition-colors duration-300' />
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                                    Top Companies
                                </div>
                            </div>
                            <div className='absolute top-1/3 right-1/4 bg-white p-4 rounded-lg shadow-lg transform -rotate-6 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group'>
                                <Users className='h-8 w-8 text-[#6A38C2] group-hover:text-[#F83002] transition-colors duration-300' />
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                                    Active Users
                                </div>
                            </div>

                            {/* Additional floating elements */}
                            <div className='absolute bottom-1/2 left-1/6 bg-white p-3 rounded-lg shadow-lg transform -rotate-45 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group'>
                                <Target className='h-6 w-6 text-[#6A38C2] group-hover:text-[#F83002] transition-colors duration-300' />
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                                    Career Goals
                                </div>
                            </div>
                            <div className='absolute top-2/3 left-1/3 bg-white p-3 rounded-lg shadow-lg transform rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group'>
                                <TrendingUp className='h-6 w-6 text-[#6A38C2] group-hover:text-[#F83002] transition-colors duration-300' />
                                <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                                    Career Growth
                                </div>
                            </div>

                            {/* Animated dots */}
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#6A38C2] animate-ping'></div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#6A38C2] animate-ping delay-300'></div>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#6A38C2] animate-ping delay-500'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection