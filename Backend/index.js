import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });

const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const corsOptions ={
    origin:'https://job-portal-mernstack-1.onrender.com',
    // origin:'http://localhost:5173',
    credentials:true
} 
app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve static files from the Frontend/dist directory
app.use(express.static(path.join(rootDir, 'Frontend', 'dist')));

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'Frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at port ${PORT}`);
});