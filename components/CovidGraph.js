import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";



const getChartData = (data, caseType) => {
    let chartData = [];
    let lastData;
    for (let date in data[caseType]) {
        if (lastData) {
            let newData = {
                x: date,
                y: data[caseType][date] - lastData,
            };
            chartData.push(newData);
        }
        lastData = data[caseType][date];
    }
    return chartData;
};

function CovidGraph({ caseType }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setData(getChartData(data, caseType));
                });
        };

        fetchData();
    }, [caseType]);

    const options = {

        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        callback: function (val, index) {
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        },
                        color: 'red',

                    }
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };

    return (
        <div>
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)",
                                fill: true,
                                data: data,
                                label: caseType,
                                tension: 1
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default CovidGraph;