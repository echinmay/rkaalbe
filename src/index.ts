// import * as functions from "firebase-functions";
import express, { Request, Response, Application } from "express";
import cors from "cors";

const app: Application = express(); // Explicitly define 'app' as an Express application
app.use(cors({ origin: true }));
app.use(express.json()); // Middleware to parse JSON requests

// API to fetch Rahu Kaal
app.get("/rahukaal", (
    req: Request<{}, any, any, { lat?: string; lon?: string }>,
    res: Response
): void => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        res.status(400).json({ error: "Latitude and Longitude are required" });
        return;
    }

    const rahukaal = calculateRahuKaal(parseFloat(lat), parseFloat(lon));
    res.json({ lat, lon, rahukaal });
    return;
});

// Function to calculate Rahu Kaal
// TODO: Replace with actual calculation
function calculateRahuKaal(lat: number, lon: number) {
    // Dummy placeholder function, replace with actual calculation
    return { start: "10:30 AM", end: "12:00 PM" };
}

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// Deployable Firebase Function
// exports.api = functions.https.onRequest(app);
export default app;