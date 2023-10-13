import React, { useState } from "react";
import { format, parse } from "date-fns";

function Homepage() {
  const [entries, setEntries] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const addEntry = () => {
    if (checkin && checkout) {
      const checkinTime = parse(checkin, "HH:mm", new Date());
      const checkoutTime = parse(checkout, "HH:mm", new Date());
      setEntries([
        ...entries,
        { checkin: checkinTime, checkout: checkoutTime },
      ]);
      setCheckin("");
      setCheckout("");
    }
  };

  const calculateTotalHours = () => {
    if (entries.length === 0) {
      return "00:00";
    }

    const totalHours = entries.reduce((total, entry) => {
      const hoursWorked = entry.checkout - entry.checkin;
      return total + hoursWorked;
    }, 0);

    return format(totalHours, "HH:mm");
  };

  return (
    <div>
      <h1>Work Hour Tracker</h1>
      <div>
        <label>Check-In Time:</label>
        <input
          type="time"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
        />
      </div>
      <div>
        <label>Check-Out Time:</label>
        <input
          type="time"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />
      </div>
      <button onClick={addEntry}>Add Entry</button>

      <div>
        <h2>Worked Hours</h2>
        <p>Total Hours Worked: {calculateTotalHours()}</p>
      </div>
    </div>
  );
}

export default Homepage;
