import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Divider, Flex, Tag } from "antd";
import Swal from "sweetalert2";


const onChange = (key) => {
  console.log(key);
};

function Adminscreen() {
  //if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin){
  //  window.location.href='/home';
  //}

  const items = [
    {
      key: "1",
      label: "Bookings",
      children: <Getbookings />,
    },
    {
      key: "2",
      label: "Rooms",
      children: <Getrooms />,
    },
    {
      key: "3",
      label: "Add Room",
      children: <AddRoom />
    },
    {
      key: "4",
      label: "Users",
      children: <Getusers />,
    },
  ];

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h1 className="text-center">
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
export default Adminscreen;

export function Getrooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError(e);
      }
    };

    fetchBookings();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Rooms</h2>

        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr className="">
              <th>Room ID</th>
              <th>Name</th>
              <th>type</th>
              <th>Rent per day</th>
              <th>Max Count</th>
              <th>Phone number</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.price}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br />
        <br />
        {rooms.length > 0 && <h1>There are a total {rooms.length} Rooms</h1>}
      </div>
    </div>
  );
}

export function Getusers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/getallusers");
        console.log("Fetched users:", response.data); // Log the data
        setUsers(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError(e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Users</h2>

        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "YES" : "NO"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Getbookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError(e);
      }
    };

    fetchBookings();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Bookings</h2>

        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr className="">
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br />
        <br />
        {bookings.length > 0 && (
          <h1>There are a total {bookings.length} bookings</h1>
        )}
      </div>
    </div>
  );
}

export function AddRoom() {
  const [name, setName] = useState("");
  const[rentperday,setRentperday] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [maxcount, setMaxcount] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [imageurl1, setImageurl1] = useState();
  const [imageurl2, setImageurl2] = useState();
  const [imageurl3, setImageurl3] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  function addRoom()
{

    const newroom = {
        name: name,
        rentperday: rentperday,
        type: type,
        description: description,
        maxcount: maxcount,
        phonenumber: phonenumber,
        imageurls:[imageurl1, imageurl2, imageurl3]
    }

    console.log(newroom);
}
  return (
    <div className="row">
      <div className="col-md-5">
        <input type="text" className="form-control" placeholder="Room name"
        value={name} onChange={(e)=>{setName(e.target.value)}} />
        <input
          type="text"
          className="form-control"
          placeholder="Rent per day"
          value={rentperday} onChange={(e)=>{setRentperday(e.target.value)}}
        />
        <input type="text" className="form-control" placeholder="Max count" 
        value={maxcount} onChange={(e)=>{setMaxcount(e.target.value)}}/>
        <input type="text" className="form-control" placeholder="Description" 
        value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        <input
          type="text"
          className="form-control"
          placeholder="Phone number"
          value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}}
        />
      </div>

      <div className="col-md-5">
        <input type="text" className="form-control" placeholder="Type" 
        value={type} onChange={(e)=>{setType(e.target.value)}}/>
        <input
          type="text"
          className="form-control"
          placeholder="Image url 1"
          value={imageurl1} onChange={(e)=>{setImageurl1(e.target.value)}}
        />
        <input type="text" className="form-control" placeholder="Image url 2" 
        value={imageurl2} onChange={(e)=>{setImageurl2(e.target.value)}}/>
        <input type="text" className="form-control" placeholder="Image url 3" 
        value={imageurl3} onChange={(e)=>{setImageurl3(e.target.value)}}
        />

        <div className="text-right">

            <button className="btn btn-primary" onClick={addRoom}>Add room</button>

        </div>

      </div>

    </div>
  );
}
