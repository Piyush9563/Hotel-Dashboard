import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({}) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  switch (type) {
    case 'bar':
      return (
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'category', 
                title: {
                  display: true,
                  text: 'Category'
                }
              },
              y: {
                beginAtZero: true, 
                title: {
                  display: true,
                  text: 'Value'
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: title,
              },
            },

          }}
        />
      );
    default:
      return <div>Invalid chart type</div>;
  }
};

export default Chart;
