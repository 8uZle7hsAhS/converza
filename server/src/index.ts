import app from "./app";
import { connectDB } from "./lib/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is runnning at localhost: ${PORT}`);
  connectDB();
});
