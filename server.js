import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";

// .env configuration
dotenv.config();

// Database connector
connectDB();

// App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ShoppyGlobe API running");
});

// Routes
app.use("/products", productRoutes);
app.use("/", authRoutes);
app.use("/cart", cartRoutes);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});