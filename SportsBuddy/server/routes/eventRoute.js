import { Router } from "express";
const router = Router();
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";
import { getAllEvents, getEventById, updateEvent, createEvent, deleteEvent } from "../controllers/eventController.js";

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", isAuthenticated, isAdmin, createEvent);
router.put("/:id", isAuthenticated, isAdmin, updateEvent);
router.delete("/:id", isAuthenticated, isAdmin, deleteEvent);

export default router;