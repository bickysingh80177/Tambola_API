const model = require("../models/ticketModel");
const catchAsyncError = require("../middleware/asyncError");
const ApiFeature = require("../utils/apiFeature");

const Ticket = model.ticketModel;

// function to create tickets
const generateTicket = (numTickets) => {
  const tickets = [];

  for (let i = 0; i < numTickets; i++) {
    const ticket = [];
    const columns = [[], [], [], [], [], [], [], [], []];

    // Generate numbers for each column
    for (let col = 0; col < 9; col++) {
      const column = columns[col];

      // Generate 5 random numbers for the column
      for (let j = 0; j < 5; j++) {
        let number;

        // Generate a unique number for the column
        do {
          number = getRandomNumber(col);
        } while (column.includes(number));

        column.push(number);
      }

      // Sort the column in ascending order
      column.sort((a, b) => a - b);
    }

    // Generate the ticket by taking one number from each column
    for (let row = 0; row < 3; row++) {
      const ticketRow = [];

      for (let col = 0; col < 9; col++) {
        const column = columns[col];
        const number = column.shift() || "x"; // Fill empty cell with "x"
        ticketRow.push(number);
      }
      ticket.push(ticketRow);
    }
    tickets.push(ticket);
  }
  return tickets;
};

function getRandomNumber(col) {
  const start = col * 10 + 1;
  const end = start + 9;
  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const index = Math.floor(Math.random() * range.length);
  return range.splice(index, 1)[0];
}

const createTicket = catchAsyncError(async (req, res, next) => {
  const { tickets } = req.body;
  const id = req.user._id;
  const ticketsArr = generateTicket(tickets);
  const ticket = await Ticket.create({
    tickets: ticketsArr,
    user: id,
  });
  res.status(200).json({
    success: true,
    tickets: ticketsArr,
    ticket: ticket,
    message: "tickets created",
  });
});

const getTickets = async (req, res) => {
  const { id } = req.user;
  const pageSize = 1;
  const apiFeature = new ApiFeature(Ticket.find({ user: id }), req.query);
  const ticket = await apiFeature.pagination(pageSize).query.clone();

  res.status(200).json({
    success: true,
    tickets: ticket,
  });
};

exports.ticketController = {
  createTicket,
  getTickets,
};
