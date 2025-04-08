import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from 'antd';
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; // Import the isBetween plugin

dayjs.extend(isBetween); // Extend dayjs with the isBetween plugin

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [SearchKey, setSearchKey] = useState(null);
  const [type, setType] = useState('All');
  
  const navigate = useNavigate(); // Hook for navigation

  // Redirect to login if not authenticated
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setLoading(false);
        setDuplicateRooms(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  // Function to handle date selection
  function filterByDate(dates) {
    if (dates && dates.length === 2) {
      setFromDate(dates[0]); 
      setToDate(dates[1]);

      const formattedFromDate = dates[0].format('DD-MM-YYYY');
      const formattedToDate = dates[1].format('DD-MM-YYYY');
    
      var temprooms = [];
      var availability = false;
      for (const room of duplicateRooms) {
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            const bookingFromDate = dayjs(booking.fromDate, 'DD-MM-YYYY');
            const bookingToDate = dayjs(booking.toDate, 'DD-MM-YYYY');

            if (
              !dates[0].isBetween(bookingFromDate, bookingToDate, null, '[]') &&
              !dates[1].isBetween(bookingFromDate, bookingToDate, null, '[]')
            ) {
              if (
                formattedFromDate !== booking.fromDate &&
                formattedToDate !== booking.toDate
              ) {
                availability = true;
              }
            }
          }
        }

        if (availability || room.currentbookings.length === 0) {
          temprooms.push(room);
        }
      }

      setRooms(temprooms);
    }
  }

  function filterbySearch(){
    const filteredRooms = duplicateRooms.filter((room) => room.name.toLowerCase().includes(SearchKey.toLowerCase()));
    setRooms(filteredRooms);
  }

  function filterByType(e){
    setType(e)

    if(e !== 'all'){
      const filteredRooms = duplicateRooms.filter((room) => room.type.toLowerCase() === e.toLowerCase());
      setRooms(filteredRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">

        <div className="col-md-3">
          <RangePicker format ="DD-MM-YYYY" onChange={filterByDate}/>
        </div>

        <div className="col-md-3">
          <input type="text" className='form-control' placeholder="Search rooms" value={SearchKey} 
          onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterbySearch}/>
        </div>

        <div className="col-md-3">
          <select className="form-control" value={type} onChange={(e) => { filterByType(e.target.value) }}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1><Loader /></h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-3" key={room._id}>
              <Room room={room} fromdate={fromDate ? fromDate.format('DD-MM-YYYY') : null} todate={toDate ? toDate.format('DD-MM-YYYY') : null} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;