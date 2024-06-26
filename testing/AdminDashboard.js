import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
// import {Chart, ArcElement} from 'chart.js'
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import '../styles/AdminDashboardStyles.css'
// Chart.register(ArcElement);

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
Chart.defaults.plugins.legend.position = "bottom";
Chart.defaults.plugins.legend.title.display = true;
// Chart.defaults.plugins.legend.title.text = "60 of 100 Done";
Chart.defaults.plugins.legend.title.font = "Helvetica Neue";

function AdminDashboard() {
  const [fraudulentCount, setFraudulentCount] = useState(0);
  const [nonFraudulentCount, setNonFraudulentCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => {
        const users = response.data;
        // Count the number of fraudulent and non-fraudulent users
        let fraudCount = 0;
        let nonFraudCount = 0;
        users.forEach((user) => {
          // Ensure that is_fraudulent is always a string
          const isFraudulent = String(user.is_fraudulent).toLowerCase();
          if (isFraudulent === "fraud") {
            fraudCount++;
          } else {
            nonFraudCount++;
          }
        });
        setFraudulentCount(fraudCount);
        setNonFraudulentCount(nonFraudCount);
        console.log(fraudCount);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        // Handle error - show an error message to the user, for example
      });
  }, []);

  const data = {
    labels: ["Fraudulent", "Non-Fraudulent"],
    datasets: [
      {
        data: [fraudulentCount, nonFraudulentCount],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        borderWidth: 2,
        radius: "100%",
      },
    ],
  };

  // Register ArcElement before rendering the chart
  Chart.register(ArcElement);


  const options = {
    plugins: {
      title: {
        display: true,
        text: "Fraud Distribution",
        fontSize: 20,
      },
    },
  };


  return (
    <>
        <br></br>
        <h2>Welcome Admin</h2>
        <div className="box-container">
      <div className="doughnut-canva">
        <Doughnut data={data}  options={options}/>
      </div>
        </div>
        
    </>
  );
}

export default AdminDashboard;
