const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/rooms');
const dayjs = require('dayjs');

router.post("/bookroom", async (req, res) => {
    const { room, userid, fromdate, todate, totalAmount, totalDays, transactionid } = req.body;

    try {
        // Ensure dates are parsed and formatted correctly using dayjs
        const formattedFromDate = dayjs(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        const formattedToDate = dayjs(todate, 'DD-MM-YYYY').format('DD-MM-YYYY');

        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: formattedFromDate,  // Use the formatted date
            todate: formattedToDate,      // Use the formatted date
            totalAmount,
            totalDays,
            transactionid
        });

        const booking = await newBooking.save();

        // Update the room's bookings
        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: formattedFromDate,
            todate: formattedToDate,
            userid : userid,
            status : booking.status
        });

        await roomtemp.save();

        res.send('Room booked successfully');
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

router.post("/getbookingsbyid", async (req, res) => {
    const { userid } = req.body;
    
    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    }catch (err) {
        return res.status(400).json({ message: err.message });
    }
})


router.post("/cancelbooking", async (req, res) => {
    const { bookingid,roomid } = req.body;
    
    try {
        const bookingitem = await Booking.findOne({_id : bookingid});
        bookingitem.status = 'cancelled';
        await bookingitem.save();

       
   const bookings = room.currentbookings

   const room = await Room.findOne({_id : roomid});

   const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
   room.currentbookings = temp;


   await room.save();

   res.send('Booking cancelled successfully');

    }catch (err) {
   return res.status(400).json({err})

    }
   
    

})

router.get('/getallbookings', async (req, res) => {

try{

    const bookings = await Booking.find();
    res.send(bookings);
}catch (err) {
return res.status(400).json({err});
}

})

module.exports = router;
