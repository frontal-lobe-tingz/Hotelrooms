import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import dayjs from 'dayjs';

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
     if(!localStorage.getItem('currentUser')){
      window.location.reload='/login';
     }

      try {
        setLoading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", { roomid });
        setRoom(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomid]);

  // Parse dates manually to ensure they are properly formatted
  const parsedFromDate = dayjs(fromdate, 'DD-MM-YYYY');
  const parsedToDate = dayjs(todate, 'DD-MM-YYYY');

  // Check if the dates are valid
  const formattedFromDate = parsedFromDate.isValid() ? parsedFromDate.format('DD-MM-YYYY') : 'Invalid Date';
  const formattedToDate = parsedToDate.isValid() ? parsedToDate.format('DD-MM-YYYY') : 'Invalid Date';

  // Calculate the total number of days between fromdate and todate
  const totalDays = parsedToDate.isValid() && parsedFromDate.isValid()
    ? parsedToDate.diff(parsedFromDate, 'day') + 1
    : 0;

  // Calculate total amount if room exists
  const totalAmount = room ? totalDays * room.rentperday : 0;


  async function bookRoom() {
    const currentUser = localStorage.getItem('currentUser');
  
    if (!currentUser) {
      alert('User not logged in');
      return;
    }
  
    const bookingDetails = {
      room,
      userid: JSON.parse(currentUser)._id, // userid from localStorage
      fromdate,
      todate,
      totalAmount,
      totalDays,
      transactionid: '1234', // Mock transaction ID for now
    };
    try {
      console.log('Booking Details:', bookingDetails); // Debugging info
      await axios.post('/api/bookings/bookroom', bookingDetails);
      alert('Booking successful');
      window.location.href = '/home';
    } catch (err) {
      console.error('Error during booking:', err.response?.data || err.message);
      alert('Error during booking: ' + err.message);
    }
  }
  

  return (
    <div className="m-6">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6" style={{ textAlign: 'right' }}>
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
          </div>
          <div className="col-md-5" style={{ textAlign: 'right' }}>
            <h1>Booking Details</h1>
            <div style={{ textAlign: 'right' }}>
              <b>
                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                <p>From Date: {formattedFromDate}</p>
                <p>To Date: {formattedToDate}</p>
                <p>Max Capacity: <strong>{room.maxcount}</strong></p>
              </b>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <p>Total days: {totalDays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total amount: {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Bookingscreen;
