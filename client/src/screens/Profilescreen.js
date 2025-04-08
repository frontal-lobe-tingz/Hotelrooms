import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Divider, Flex, Tag } from 'antd';
import Swal from 'sweetalert2';

const onChange = (key) => {
  console.log(key);
};

function Profilescreen() {
  const items = [
    {
      key: "1",
      label: "Profile",
      children: <MyProfile />,
    },
    {
      key: "2",
      label: "Bookings",
      children: <MyBookings />,
    },
  ];

  return (
    <div className="mt-3 ml-3">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          // setLoading(true);
          const response = await axios.post("/api/bookings/getbookingsbyid/", {
            userid: user._id,
          });
          console.log("API Response:", response.data);

          setBookings(response.data);
          setLoading(false);
         // Swal.fire('Congrats', 'Your bookings have been cancelled', 'success').then(result => {
           // window.location.reload();
          //});
        } catch (err) {
          console.log("Error fetching bookings:", err);
          setLoading(false);
         // Swal.fire('Oops', 'Something went wrong', 'error');
          setError(err.message);
        } 
      }
    };

    fetchBookings();
  }, [user]);

  const cancelBooking = async (bookingid, roomid) => {
    try {
      const response = await axios.post('/api/bookings/cancelbooking/', {
        bookingid: bookingid,
        roomid: roomid,
      });
      console.log("API Response:", response.data);
      alert('Booking cancelled successfully');

      // Refresh the bookings list after cancellation
      setBookings(bookings.filter(booking => booking._id !== bookingid));
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    return <div>Please log in to view your bookings.</div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {error && <Error message={error} />}
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="bs">
                <h1>Room: {booking.room}</h1>
                <p>Booking ID : {booking._id}</p>
                <p><b>Check-in:</b> {booking.fromdate}</p>
                <p><b>Check-out:</b> {booking.todate}</p>
                <p><b>Amount Paid:</b> {booking.totalAmount}</p>
                <p><b>Status:</b>:{" "} 
                {booking.status === 'cancelled' ? (<Tag color="red">Cancelled</Tag>) : <Tag color="green">Confirmed</Tag>}</p>

                
                {booking.status === 'booked' && (
                  <div className="text-right">
                    <button className="btn btn-primary" onClick={() => cancelBooking(booking._id, booking.roomid)}>Cancel Booking</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            !loading && <div>No bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MyProfile() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("User from localStorage:", user);

    if (!user) {
      console.log("No user found, redirecting to login.");
      window.location.href = "/login";
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <div>Loading...</div>;  // This might never be reached if redirect occurs.
  }

  return (
    <div>
      <h1>My Profile</h1>
      <br />
      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>isAdmin: {user.isAdmin ? "YES" : "No"}</h1>
    </div>
  );
}
