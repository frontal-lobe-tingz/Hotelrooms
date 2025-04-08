const mongoose=require('mongoose');


const bookingSchema = new mongoose.Schema({
    room: { type: String, required: true },
    roomid: { type: String, required: true },
    userid: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    totalDays: { type: Number, required: true },
    transactionid: { type: String, required: true }, // Ensure this matches what you send from frontend
    status: { type: String, required: true}
  }, {
    timestamps: true,
  });
  

const bookingmodel = mongoose.model('bookings', bookingSchema)

module.exports = bookingmodel