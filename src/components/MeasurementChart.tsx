import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useRef } from 'react';


export default function MeasurementChart({ chartData, title, unit }) {
  const chartRef = useRef(null)

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };
  return (
    <div className="chart-container">
      <button onClick={handleResetZoom}>Reset Zoom</button>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title
            },
            legend: {
              display: false
            },
            zoom: {
              pan: {
                enabled: false,
                mode: 'xy',
                scaleMode: 'xy',
                threshold: 10,
              },
              zoom: {
                wheel: {
                  enabled: true
                },
                drag:{
                  enabled: true,
                  backgroundColor: 'rgba(225,0,0,0.3)',
                  borderColor: 'rgba(225,0,0)',
                },
                mode: 'xy',
                scaleMode: 'xy'
              }
            }
          },
          scales:{
            x:{
              type: 'time',
              ticks: {
                autoSkip: true,
                autoSkipPadding:50,
                maxRotation: 0,
              },
              time: {
                displayFormats: {
                  hour: 'MMM-dd HH:mm',
                  minute: 'HH:mm',
                  second: 'HH:mm:ss',
                  day: 'MMM-dd',
                }
              },

              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: `Value [${unit}]`
              }
            }
          }
        }}
      />
    </div>
    
  );
}

