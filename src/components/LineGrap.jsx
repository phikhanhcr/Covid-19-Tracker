import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { tooltip } from 'leaflet';
import numeral from 'numeral'

function LineGrap(props) {
  const options = {
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 2
      }
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltips, data) {
          return numeral(tooltips.value).format("+0,0")
        }
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          }, ticks: {
            callbacks: function (value, index, values) {
              return numeral(value).format('0a')
            }
          }
        }
      ]
    }
  }
  const [data, setData] = useState([]);
  const convertData = (data, caseType = "cases") => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        // compare 2 consecutive days
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDataPoint
        }
        chartData.push(newDataPoint)
      }
      lastDataPoint = data[caseType][date];
    }
    return chartData;
  }


  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res => res.json())
        .then(data => {
          let chartData = convertData(data, 'cases')
          setData(chartData);
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchData();
  }, [])
  console.log(data)
  return (
    <div>
      {
        data.length > 0 && (
          <Line
            options={options}
            data={{
              datasets: [{
                data: data,
                borderColor: "#CC1034",
                backgroundColor: "rgba(204, 16,52,0.3)",
                borderWidth: 1
              }]
            }}
          />
        )
      }

    </div>
  );
}

export default LineGrap;