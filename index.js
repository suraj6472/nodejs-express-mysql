import express from 'express'
import cors from 'cors'
import tutorialRouter from "./routes/tutorials.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tutorials", tutorialRouter);
app.get("/", (req, res) => {
  res.send("this is working now.");
});
const port = 5000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});