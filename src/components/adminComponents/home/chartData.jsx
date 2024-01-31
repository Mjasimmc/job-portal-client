import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { getChartData } from '../../../service/admin/subscription';

const ChartData = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const payments = await getChartData();
                const updatedData = payments.map((payment) => ({
                    date: payment[0],
                    amount: payment[1],
                }));

                setChartData(updatedData);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);

    const options = {
        series: [
            {
                name: "Series 1",
                data: chartData.map(data => ({
                    x: data.date,
                    y: data.amount
                }))
            }
        ],
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: undefined,
            options: {},
        }],
        xaxis: {
            type: "datetime",
            tickAmount: 'dataPoints', // 'dataPoints' will make each data point a tick
            min: chartData.length > 0 ? new Date(chartData[0].date).getTime() : undefined,
            // max: chartData.length > 0 ? new Date(chartData[chartData.length - 1].date).getTime() : undefined,
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm',
                },
                
            },
        },
        yaxis: {
            type: "datetime",
            min: 0,
        },
        fill: {
            colors: [function ({ value, seriesIndex, w }) {
                if (value < 55) {
                    return '#7E36AF'
                } else if (value >= 55 && value < 80) {
                    return '#164666'
                } else {
                    return '#D9534F'
                }
            }]
        },
        stroke: {
            curve: 'smooth',
        },
        annotations: {
            yaxis: [{
                y: 30,
                borderColor: '#999',
                label: {
                    show: true,
                    text: 'Support',
                    style: {
                        color: "#fff",
                        background: '#00E396'
                    }
                }
            }],
            xaxis: [{
                x: new Date('14 Nov 2012').getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
                label: {
                    show: true,
                    text: 'Rally',
                    style: {
                        color: "#fff",
                        background: '#775DD0'
                    }
                }
            }],

        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        title: {
            text: 'Subscription Payment Chart',
            align: 'center',

        },

    };

    return (
        <div className='text-black pt-4' >
            <ApexCharts options={options} series={options.series} type="area" height={380} />
        </div >
    );
};

export default ChartData;
