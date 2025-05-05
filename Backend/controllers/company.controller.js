import { Company } from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';



export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({
                message: "You can't register existing company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "A company with this name already exists.",
                success: false
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Server error during company registration.",
            success: false
        });

    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        
        // Initialize updateData with all fields
        let updateData = {
            name: name,
            description: description,
            website: website,
            location: location,
            logo:""
        };

        // Handle file upload if file exists
        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    folder: 'company_logos',
                    resource_type: 'auto' // This allows any file type
                });
                updateData.logo = cloudResponse.secure_url;
            } catch (uploadError) {
                return res.status(400).json({
                    message: "Error uploading logo. Please try again.",
                    success: false
                });
            }
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "A company with this name already exists.",
                success: false
            });
        }
        console.error("Update company error:", error);
        return res.status(500).json({
            message: "Error updating company information.",
            success: false
        });
    }
}
export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error("Delete company error:", error);
        return res.status(500).json({
            message: "Error deleting company.",
            success: false
        });
    }
}