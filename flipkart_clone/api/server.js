import express from "express";
import productRoute from "./routes/product.js";
import authRoute from './routes/auth.js';
import cartRoute from "./routes/cart.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/product", productRoute);
app.use("/api/auth", authRoute);
app.use("/api/cart",cartRoute);

app.use((obj, req, res, next) => {
  const status = obj.status || 500;
  const message = obj.message || "Something went wrong!";
  return res.status(status).json({
    success: [200, 201, 204].some(a => a === obj.status) ? true : false,
    status: status,
    message: message,
    data: obj.data
  });
});

const listener = app.listen(8800, () => {
  console.log("Backend is running on the port: " + listener.address().port);
});
