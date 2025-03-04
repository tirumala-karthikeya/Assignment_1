const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("../backend/routes/authRoutes"));
app.use("/api/auth", require("../backend/routes/auth"));
app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
