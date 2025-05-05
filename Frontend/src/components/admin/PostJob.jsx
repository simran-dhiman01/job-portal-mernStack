import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        TotalOpenings: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className="bg-white max-w-3xl mx-auto p-10 rounded-2xl shadow-2xl border border-gray-100 space-y-4">
                    <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">Post a New Job</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                               
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                              
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-700 font-semibold">Description</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                rows={5}
                                placeholder="Describe the job role, responsibilities, etc."
                                className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 resize-none shadow-sm transition duration-200 bg-white text-gray-800 placeholder-gray-400"
                                style={{ minHeight: '120px', fontSize: '1rem', fontFamily: 'inherit' }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                               
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                              
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                               
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                                placeholder="e.g. 2+ years"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-700 font-semibold">No of Openings</Label>
                            <Input
                                type="number"
                                name="TotalOpenings"
                                value={input.TotalOpenings}
                                onChange={changeEventHandler}
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
                                placeholder="e.g. 3"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label className="text-gray-700 font-semibold">Company</Label>
                            {companies.length > 0 ? (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p className="text-xs text-red-600 font-bold text-center my-3">
                                    *Please register a company first, before posting jobs
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <Button className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 rounded-lg flex items-center justify-center">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 rounded-lg">
                                Post Job
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob