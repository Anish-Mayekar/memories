import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";



const YourComponent = () => {
  const [cityFrequency, setCityFrequency] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => {
        const users = response.data;

        // Create an object to store city frequencies
        const frequency = {};

        // Iterate through users and count frequencies
        users.forEach((user) => {
          const city = user.vehiclecategory;          ;

          // If city exists in the object, increment frequency
          if (frequency[city]) {
            frequency[city]++;
          } else {
            // If city doesn't exist, initialize frequency to 1
            frequency[city] = 1;
          }
        });

        // Set city frequency state
        setCityFrequency(frequency);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Chart data
  const chartData = {
    labels: Object.keys(cityFrequency), // City names as labels
    datasets: [
      {
        label: "Vehicle categories",
        backgroundColor: "rgba(255, 51, 51, 255)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: Object.values(cityFrequency), // Frequency counts as data
      },
    ],
  };

  return (
    <div>
      <h2>City Frequencies</h2>
      <div style={{ height: "400px", width: "600px" }}>
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: "City Frequencies",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
};

export default YourComponent;
