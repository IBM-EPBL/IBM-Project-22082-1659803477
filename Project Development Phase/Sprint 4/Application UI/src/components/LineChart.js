import React from "react";
import { Chart } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  import { ArcElement} from 'chart.js'
  
import { Line ,Doughnut} from "react-chartjs-2";


 


export default function LineChart(props) {



  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  ChartJS.register(ArcElement);

  

  let data = [props.donor,props.request, props.user]
  let labels = ["Verified Donor", "Requested", "Users"]
  
  let customLabels = labels.map((label,index) =>`${label}: ${data[index]}`)

  const chartdata = {
    labels: customLabels,
    datasets: [
      {
        label: "Markets Monitored",
        backgroundColor: [
          "#83ce83",
          "#959595",
          "#f96a5d",
          "#00A6B4",
          "#6800B4",
        ],
        data: data,
      },
    ],
  };

    <Doughnut
      data={chartdata}
      options={{
        legend: { display: true, position: "right" },

        datalabels: {
          display: true,
          color: "white",
        },
        tooltips: {
          backgroundColor: "#5a6e7f",
        },
      }}
    />




  return (
    <div style={{width: '300px', height: '300px'}}>
        <Doughnut
      data={chartdata}
      options={{
       

        datalabels: {
          display: true,
          color: "white",
        },
        tooltips: {
          backgroundColor: "#5a6e7f",
        },
        
          responsive: true,
          maintainAspectRatio: true,
        
      }}
    />
    </div>
  );
}
