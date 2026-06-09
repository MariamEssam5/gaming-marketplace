import express from "express";
import { body, validationResult } from "express-validator";
import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
} from "../controllers/ticketController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation error", errors: errors.array() });
  }
  next();
};

router
  .route("/")
  .post(
    protect,
    [
      body("subject").notEmpty().withMessage("Subject is required"),
      body("message").notEmpty().withMessage("Message is required"),
    ],
    checkValidation,
    createTicket
  )
  .get(protect, admin, getAllTickets);

router.route("/my-tickets").get(protect, getMyTickets);

router
  .route("/:id/status")
  .put(
    protect,
    admin,
    [body("status").isIn(["open", "closed"]).withMessage("Status must be 'open' or 'closed'")],
    checkValidation,
    updateTicketStatus
  );

export default router;
