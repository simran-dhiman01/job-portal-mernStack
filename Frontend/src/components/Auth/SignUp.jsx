import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Phone, Image as ImageIcon } from 'lucide-react'

function SignUp() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
            <p className="mt-1 text-sm text-gray-600">Join us and start your journey</p>
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Full name"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    className="pl-9 w-full h-9"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    className="pl-9 w-full h-9"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="pl-9 w-full h-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="password"
                  placeholder="Create password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="pl-9 w-full h-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">I am a</Label>
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="candidate"
                    id="r1"
                    checked={input.role === 'candidate'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1" className="cursor-pointer text-sm">Candidate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    id="r2"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2" className="cursor-pointer text-sm">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">Profile Photo</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="pl-9 w-full h-9 cursor-pointer"
                />
              </div>
            </div>

            <div>
              {loading ? (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Create Account
                </Button>
              )}
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
