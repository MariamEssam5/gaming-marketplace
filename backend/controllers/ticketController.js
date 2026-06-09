import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Protected
export const createTicket = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  const ticket = await Ticket.create({
    user: req.user._id,
    subject,
    message,
  });

  res.status(201).json(ticket);
});

// @desc    Get user's tickets
// @route   GET /api/tickets/my-tickets
// @access  Protected
export const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tickets);
});

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Protected/Admin
export const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  
  res.json(tickets);
});

// @desc    Update ticket status
// @route   PUT /api/tickets/:id/status
// @access  Protected/Admin
export const updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.status = status || ticket.status;
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});
