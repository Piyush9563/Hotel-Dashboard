import React, { useState } from 'react';

const Selector = ({ selectedDateRange, onChange }) => {
  const [startDate, setStartDate] = useState(selectedDateRange.startDate);
  const [endDate, setEndDate] = useState(selectedDateRange.endDate);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    onChange({ startDate: e.target.value, endDate });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    onChange({ startDate, endDate: e.target.value });
  };

  return (
    <div>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={handleEndDateChange} />
    </div>
  );
};

export default Selector;