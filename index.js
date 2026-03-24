import express from "express"
import connectDB from "./config/db.js";
import EnvData from "./config/EnvData.js";
import UserRoute from "./routes/UserRoute.js"
import CategoryRoute from "./routes/CategoryRoute.js"
import ProductRoute from "./routes/ProductRout.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Api is live")
});

app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/product", ProductRoute);

app.listen(EnvData.PORT, () => {
    connectDB()
    console.log('server is running ON PORT :', EnvData.PORT);

});