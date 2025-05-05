import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

function getInitials(fullname) {
  if (!fullname) return "";
  const names = fullname.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

function Navbar() {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Logout error:", error);
        if (error.response) {
            toast.error(error.response.data.message || "Error during logout");
        } else {
            toast.error("Network error during logout");
        }
    }
}

return (
    <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
            <div>
                <h1 className='text-2xl font-bold text-blue-900'>Pro<span className='text-[#e00f0f]'>Hire</span></h1>
            </div>
            <div className='flex items-center gap-12'>
                <ul className='flex font-medium items-center cursor-pointer gap-5'>
                {
                    user && user.role === 'recruiter' ? (
                    <>
                        <li><Link to="/admin/companies">Companies</Link></li>
                        <li><Link to="/admin/jobs">Jobs</Link></li>
                    </>
                    ) : (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </>
                    )
                }
                </ul>
                {
                    !user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline">Login</Button> </Link>
                            <Link to="/SignUp"><Button className="bg-[#8850e9] hover:bg-[#5b30a6dc] ">Sign Up</Button> </Link>

                        </div>
                    ) :
                        (<Popover >
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcnui" />
                                    <AvatarFallback className='bg-gray-800 text-white'>{getInitials(user?.fullname)}</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcnui" />
                                        <AvatarFallback className='bg-gray-800 text-white'>{getInitials(user?.fullname)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col  text-gray-600 my-2' >
                                    {
                                        user && user.role ==='candidate' && (
                                            <div className='flex w-fit items-center'>
                                            <User2 />
                                            <Link to="/profile" className="flex items-center gap-2">
                                                <Button
                                                    variant="link"
                                                    className="cursor-pointer hover:bg-transparent focus:outline-none focus:ring-0focus-visible:outline-none focus-visible:ring-0 ">
                                                    Profile
                                                </Button>
                                            </Link>
                                        </div>
                                        )
                                    }
                                   
                                     {/* <Button variant="link" className="cursor-pointer hover:bg-transparent focus:outline-none focus:ring-0 focus-visible:outline-none"><Link to="/profile">Profile</Link></Button> */}
                                    <div className='flex w-fit items-center '>
                                        <LogOut />
                                        {/* <Button onClick={logoutHandler} variant="link" className="cursor-pointer">Log Out</Button> */}
                                      
                                                <Button onClick ={logoutHandler}
                                                    variant="link"
                                                    className="cursor-pointer hover:bg-transparent focus:outline-none focus:ring-0focus-visible:outline-none focus-visible:ring-0 ">
                                                    Log Out
                                                </Button>
                                          
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>)
                }
            </div>
        </div>

    </div>
    )
}

export default Navbar
