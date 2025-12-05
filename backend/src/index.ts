import express from "express";
import dotenv from "dotenv";

dotenv.config();  // <-- CARREGA O .env !!

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("DATABASE_URL USADA PELO BACKEND:", process.env.DATABASE_URL);
});
