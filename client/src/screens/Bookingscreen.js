// client/src/screens/Bookingscreen.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import dayjs from "dayjs";

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [room,    setRoom]    = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated

    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Fetch room details
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${API_URL}/api/rooms/getroombyid`,
          { roomid },
          { headers: { "Content-Type": "application/json" } }
        );
        setRoom(data);
      } catch (err) {
        console.error("Fetch room error:", err.response?.data || err.message);
        setError("Could not load room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [API_URL, navigate, roomid]);

  // parse and format dates
  const start = dayjs(fromdate, "DD-MM-YYYY");
  const end   = dayjs(todate,   "DD-MM-YYYY");
  const validDates = start.isValid() && end.isValid();
  const totalDays   = validDates ? end.diff(start, "day") + 1 : 0;
  const totalAmount = room ? totalDays * room.rentperday : 0;

  const bookRoom = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const bookingDetails = {
      room,
      userid:        currentUser._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
      transactionid: "1234", // placeholder
    };

    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/api/bookings/bookroom`,
        bookingDetails,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Booking successful");
      navigate("/home");
    } catch (err) {
      console.error("Error during booking:", err.response?.data || err.message);
      alert("Error during booking: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error)   return <Error message={error} />;

  return (
    <div className="container mt-5">
      {room && (
        <div className="row justify-content-center bs p-4">
          <div className="col-md-6 text-center">
            <h2>{room.name}</h2>
            <img src={room.imageurls[0]} className="img-fluid" alt={room.name} />
          </div>
          <div className="col-md-5">
            <h3>Booking Details</h3>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>From:</strong> {fromdate}</p>
            <p><strong>To:</strong> {todate}</p>
            <p><strong>Days:</strong> {totalDays}</p>
            <p><strong>Rent/day:</strong> {room.rentperday}</p>
            <p><strong>Total:</strong> {totalAmount}</p>
            <button className="btn btn-primary mt-3" onClick={bookRoom}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
