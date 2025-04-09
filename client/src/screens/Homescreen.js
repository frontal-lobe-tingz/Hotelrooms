// client/src/screens/Homescreen.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [SearchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Redirect if not logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) navigate("/login");
  }, [navigate]);

  // Fetch rooms from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/rooms/getallrooms`
        );
        setRooms(response.data);
        setDuplicateRooms(response.data);
      } catch (err) {
        console.error("Fetch rooms error:", err);
        setError(err.message || "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  // Filter by date range
  const filterByDate = (dates) => {
    if (!dates || dates.length !== 2) return;

    setFromDate(dates[0]);
    setToDate(dates[1]);

    const from = dates[0].format("DD-MM-YYYY");
    const to = dates[1].format("DD-MM-YYYY");
    const temp = [];

    for (const room of duplicateRooms) {
      let available = room.currentbookings.length === 0;

      for (const booking of room.currentbookings) {
        const bFrom = dayjs(booking.fromdate, "DD-MM-YYYY");
        const bTo = dayjs(booking.todate, "DD-MM-YYYY");

        // if your desired range overlaps an existing booking → not available
        if (
          dates[0].isBetween(bFrom, bTo, null, "[]") ||
          dates[1].isBetween(bFrom, bTo, null, "[]")
        ) {
          available = false;
          break;
        } else {
          available = true;
        }
      }

      if (available) temp.push(room);
    }

    setRooms(temp);
  };

  // Filter by search key
  const filterBySearch = () => {
    const filtered = duplicateRooms.filter((r) =>
      r.name.toLowerCase().includes(SearchKey.toLowerCase())
    );
    setRooms(filtered);
  };

  // Filter by room type
  const filterByType = (selected) => {
    setType(selected);
    if (selected === "all") {
      setRooms(duplicateRooms);
    } else {
      setRooms(
        duplicateRooms.filter(
          (r) => r.type.toLowerCase() === selected.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="container">
      {error && <Error message={error} onClose={() => setError(null)} />}

      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search rooms"
            value={SearchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-3" key={room._id}>
              <Room
                room={room}
                fromdate={fromDate?.format("DD-MM-YYYY")}
                todate={toDate?.format("DD-MM-YYYY")}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
