import { Router, Request, Response } from "express";
import { calculateRahuKaal } from "../services/rahukaalService";

const router = Router();

router.get("/", (
    req: Request<{}, any, any, { lat?: string; lon?: string }>,
    res: Response
): void => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        res.status(400).json({ error: "Latitude and Longitude are required" });
        return;
    }

    try {
        const rahukaal = calculateRahuKaal(parseFloat(lat), parseFloat(lon));
        res.json({ lat, lon, rahukaal });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;