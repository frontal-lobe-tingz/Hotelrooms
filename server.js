const express = require('express');
const roomsRoutes = require('./routes/roomsRoute');

const app = express();

const dbconfig = require('./db')
const roomsRoute = require('./routes/roomsRoute');

const usersRoutes = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

const cors = require('cors');

app.use(cors());

app.use(express.json());


app.use('/api/rooms', roomsRoutes)
app.use('/api/user',usersRoutes)
app.use('/api/bookings',bookingsRoute)

const port = process.env.Port || 5000;

app.listen(port,(err, data) =>{
    if(err) console.log(err);
    else console.log(`Server is running on port ${port}`);
});