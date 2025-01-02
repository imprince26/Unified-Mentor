const express = require("express");
const app = express();
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllEvents,
  getEventById,
  updateEvent,
  createEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", isAuthenticated, isAdmin, createEvent);
router.put("/:id", isAuthenticated, isAdmin, updateEvent);
router.delete("/:id", isAuthenticated, isAdmin, deleteEvent);

module.exports = router;