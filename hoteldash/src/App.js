import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './components/chart';
import DateSelector from './components/selector';

const App = () => {
  const [chartData, setChartData] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: '2015-07-01',
    endDate: '2015-07-31',
  });

  useEffect(() => {
    fetchData(selectedDateRange);
  }, [selectedDateRange]);

  const fetchData = async (dateRange) => {
    try {
      const res = await axios.get(`dat.json`);
      const data = res.data;
      const filteredData = data.filter((item) => {
        const date = new Date(item.year, item.month - 1, item.day);
        return date >= new Date(dateRange.startDate) && date <= new Date(dateRange.endDate);
      });
      setChartData(processData(filteredData));
    } catch (error) {
      console.error(error);
    }
  };

  const processData = (data) => {
    const visitorsPerDay = {};
    const visitorsPerCountry = {};
    const adultVisitors = 0;
    const childrenVisitors = 0;
    const babyVisitors = 0;

    data.forEach((item ) => {
      const date = `${item.year}-${item.month}-${item.day}`;
      visitorsPerDay[date] = (visitorsPerDay[date] || 0) + 1;
      visitorsPerCountry[item.country] = (visitorsPerCountry[item.country] || 0) + 1;
      adultVisitors += item.adults;
      childrenVisitors += item.children;
      babyVisitors += item.babies;
    });

    return {
      visitorsPerDay,
      visitorsPerCountry,
      adultVisitors,
      childrenVisitors,
      babyVisitors,
    };
  };

  return (
    <div>
      <h1>Hotel Dashboard</h1>
      <DateSelector
        selectedDateRange={selectedDateRange}
        onChange={(dateRange) => setSelectedDateRange(dateRange)}
      />
      <Chart type="line" title="Visitors per day" data={chartData.visitorsPerDay} color="blue" chartData={chartData} />
      <Chart type="column" title="Visitors per country" data={chartData.visitorsPerCountry} color="green" chartData={chartData} />
      <Chart type="sparkline" title="Total number of adult visitors" data={chartData.adultVisitors} color="red" chartData={chartData} />

    </div>
  );
};

export default App;