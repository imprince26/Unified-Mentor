import { Router } from "express";
const router = Router();
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getAllEvents, getEventById, updateEvent, createEvent, deleteEvent } from "../controllers/eventController.js";

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", isAuthenticated, createEvent);
router.put("/:id", isAuthenticated, updateEvent);
router.delete("/:id", isAuthenticated, deleteEvent);

export default router;