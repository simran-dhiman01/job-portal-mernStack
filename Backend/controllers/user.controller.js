import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { promisify } from "util";
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/cloudinary.js'

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        // Create user data object
        const userData = {
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {}
        }

        if (req.file) {
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            userData.profile.profilePhoto = cloudResponse.secure_url;
        }

        await User.create(userData);
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Error during registration",
            error: error.message,
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill the required details.",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const signAsync = promisify(jwt.sign);
        const token = await signAsync(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    }
    catch (error) {
        console.log(error);

    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })
            .json({
                message: "Logged out successfully.",
                success: true
            });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Error during logout.",
            success: false
        });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id;
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        // Handle file upload if present
        if (req.file) {
            try {
                // Check if file is a PDF
                if (req.file.mimetype !== 'application/pdf') {
                    return res.status(400).json({
                        message: "Only PDF files are allowed for resumes.",
                        success: false
                    });
                }

                const fileUri = getDataUri(req.file);

                // Upload to Cloudinary with specific options for PDF
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw",
                    folder: "job-portal/resumes",
                    format: "pdf"
                });
                if (cloudResponse) {
                    user.profile.resume = cloudResponse.secure_url;
                    user.profile.resumeOriginalName = req.file.originalname;
                }
            } catch (fileError) {
                console.error("Error in file upload process:", {
                    error: fileError.message,
                    stack: fileError.stack
                });
                return res.status(500).json({
                    message: "Error uploading file to Cloudinary. Please try again.",
                    error: fileError.message,
                    success: false
                });
            }
        }

        // Update user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) {
            const skillsArray = skills.split(",");
            user.profile.skills = skillsArray;
        }

        await user.save();

        // Prepare response
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({
            message: "Error saving profile.",
            error: error.message,
            success: false
        });
    }
}