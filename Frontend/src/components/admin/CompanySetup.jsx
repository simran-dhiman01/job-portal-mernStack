import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const navigate = useNavigate();
    const {singleCompany} = useSelector(store=>store.company);
   
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }
    const submitHandler = async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('name' , input.name)
        formData.append('description' , input.description)
        formData.append('website' , input.website)
        formData.append('location' , input.location)
        if(input.file){
            formData.append('file',input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData , {
                Headers:{
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials : true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    const company = res.data.company;
                    setInput({
                        name: company.name || "",
                        description: company.description || "",
                        website: company.website || "",
                        location: company.location || "",
                        file: null
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [params.id]);
    
    return (
        <div>
            <Navbar/>
            <div className='max-w-xl mx-auto my-10 bg-white rounded-lg shadow-md p-6'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8 border-b border-gray-200'>
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            variant="outline" 
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors duration-200"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl text-gray-800'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-6 p-8'>
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-medium'>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className='focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-medium'>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-medium'>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className='focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-medium'>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className='text-gray-700 font-medium'>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className='focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>
                    <div className='px-8 pb-6'>
                        {
                            loading ? (
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                                >
                                    Update
                                </Button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
