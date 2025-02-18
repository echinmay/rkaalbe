// import * as functions from "firebase-functions";
import express, { Application } from "express";
import cors from "cors";
import rahukaalRoutes from "./routes/rahukaal.js";

const app: Application = express(); // Explicitly define 'app' as an Express application
app.use(cors({ origin: true }));
app.use(express.json()); // Middleware to parse JSON requests

app.use("/rahukaal", rahukaalRoutes);

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// Deployable Firebase Function
// exports.api = functions.https.onRequest(app);
export default app;